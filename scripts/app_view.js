/*global Educreations, $, _, Backbone, JST */

Educreations.Views.AppView = Backbone.View.extend({
  template: JST["templates/app.hbs"],

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
    this.listenTo(this.ventFromServer, 'attached', function(){
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
      this.$el.find('.gadget-embed').html( JST["templates/error.hbs"]() );

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
