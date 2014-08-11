/*global $, _, Backbone */

window.Educreations = {
  Views: {},
  init: function (that, thatEl) {
    that.appModel = new Backbone.Model();
    that.appView = new Educreations.Views.AppView({
      model: that.appModel,
      el: thatEl  //todo, no hardcode
    });
    that.appView.render();
  }
};

Educreations.Views.AppView = Backbone.View.extend({
  template: function() {
    return '<div class="gadget-embed"></div>';
  },

  events:{
  },

  initialize: function(){
    //house keeping
    _.bindAll(this, 'render', 'renderEmbedCode');

    //author or learner, default to learner
    this.isEditable = false;

    //two event buses
    this.ventFromServer = _.extend({}, Backbone.Events);
    this.ventToServer = _.extend({}, Backbone.Events);

    //similar to dom ready, fired with the gadget is attached to dom
    this.listenTo(this.ventFromServer, 'editableChanged', function(){
      // console.log('attached');
      this.setPropertySheet();
    });

    //the main channel for server to send data back
    this.listenTo(this.ventFromServer, 'attributesChanged', function(messageData){
      // console.log('attributesChanged', messageData);
      if(messageData && messageData.embedCode){ //guard against undefined
        this.model.set('embedCode', messageData.embedCode);
      }
    });

    //server tells whether it is authoring or learning mode
    this.listenTo(this.ventFromServer, 'setEditable', function(editable){
      // console.log('setEditable', editable);
      this.isEditable = editable;
    });

    //lazy render based on changes of the local backbone model
    var lazyRenderEmbedCode = _.debounce(this.renderEmbedCode, 300);
    this.listenTo(this.model, 'change', function(){
      // console.log('change');
      lazyRenderEmbedCode();
    });

  },

  /**
   * set up a textarea for authors to put in embed code
   */
  setPropertySheet: function(){
    this.ventToServer.trigger('setPropertySheetAttributes', {
      embedCode: {
        type: 'TextArea',
        title: 'Embed Code'
      }
    });
  },

  /**
   * a stubbed sanitization function for now
   * @param  {HTML string} input
   * @return {HTML string} already sanitized
   * todo
   * needs to implement this function
   */
  sanitizeStub: function(input){
    return input;
  },

  /**
   * render either the iframe or the error message
   */
  renderEmbedCode: function(){
    var sanitizedHtml = this.sanitizeStub( this.model.get('embedCode') );

    var sanitizedIframeDom = $('<div>'+ sanitizedHtml + '</div>').find('iframe').get(0);

    if(sanitizedIframeDom){
      //iframe here
      this.$el.find('.gadget-embed').html( sanitizedIframeDom );

    } else {
      //no iframe, error out
      //note invoking the compiled error template here
      this.$el.find('.gadget-embed').html('<div class="gadget-embed-not-valid">Please specify the embed code</div>');

      //hide the gadet in learner view if it is in error state
      if(!this.isEditable){
        this.$el.hide();
      }
    }
  },

  /**
   * intial render to set up basic DOM
   */
  render: function(){
    this.$el.html( this.template() );
    this.delegateEvents();
    return this;
  }

});

(function (Backbone, $, _) {

  /**
   * main file for Versal gadget
   * @param {el: DOM node} options
   */
  var Gadget = function(options) {
    this.el = options.el;

    this.initialize();

    //todo
    //getter and setter for both config and learnerState
  };

  Gadget.prototype.initialize = function () {
    // console.log('initialize');

    //the line belows starts a backbone app
    window.Educreations.init(this, this.el);

    //relay msg from player to gadget
    window.addEventListener('message', function(msg){
      if(!msg || !msg.data){
        return; //server provides no information
      }

      var msgData = msg.data;

      //return for string response
      if(typeof msgData === 'string') {
        console.log('Error. Server sends string instead of object.', msgData);
        return;
      }

      //relay events to appView
      if(msgData.event){
        this.appView.ventFromServer.trigger(msgData.event, msgData.data);
      } else {
        console.log('Server send an response with no event name');
      }
    }.bind(this));

    //relay msg from gadget to player
    this.appView.ventToServer.on('all', function(messageName, messageData){
      this.sendMessage({
        event: messageName,
        data: messageData
      });
    }, this);

    this.appView.ventToServer.trigger('startListening');
  };

  Gadget.prototype.sendMessage = function (msg) {
    window.parent.postMessage(msg, '*');
    // console.log([
    //   'toPlayer', msg.event, msg.data
    // ]);
  };

  //starting point of the gadget
  //expose a global variable for testing purpose
  //probablly should have used AMD
  window.educreationsGadget = new Gadget({
    el: document.querySelector('.main-app')
  });

})(Backbone, $, _);
