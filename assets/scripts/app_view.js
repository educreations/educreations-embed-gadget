/*global Educreations, $, _, Backbone, JST */

Educreations.Views.AppView = Backbone.View.extend({
  template: JST["assets/templates/app.hbs"],

  events:{
  },

  initialize: function(){
    //set up default embed code
    var defaultEmbedCode = '<iframe width="480" height="300" src="'+
      'https://www.educreations.com/lesson/embed/444280/" '+
      'frameborder="0" webkitAllowFullScreen mozallowfullscreen '+
      'allowfullscreen></iframe>';

    //this.model is a Backbone model in memory, meaning not persisted
    //it can be replaced by a simple object if you don't need change events
    if(typeof this.model.get('embedCode') === undefined ||
      $.trim(this.model.get('embedCode')) === '') {
      this.model.set('embedCode', defaultEmbedCode);
    }

    //author or leaner
    this.isEditable = false;

    //two event buses
    this.ventFromServer = _.extend({}, Backbone.Events);
    this.ventToServer = _.extend({}, Backbone.Events);

    //events with servers
    this.listenTo(this.ventFromServer, 'attached', function(){
      //set default configuration
      // console.log('attached');
      this.setPropertySheet();
      this.renderEmbedCode();
    });
    this.listenTo(this.ventFromServer, 'attributesChanged', function(messageData){
      // console.log('attributesChanged', messageData);
      if(messageData && messageData.embedCode){
        this.model.set('embedCode', messageData.embedCode);
      }
    });
    this.listenTo(this.ventFromServer, 'setEditable', function(editable){
      console.log('setEditable', editable);
      this.isEditable = editable;
    });

    //events with local backbone model
    this.listenTo(this.model, 'change', function(data){
      console.log('change', data);
      this.renderEmbedCode();
    });

  },

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

  renderEmbedCode: function(){
    var sanitizedHtml = this.sanitizeStub( this.model.get('embedCode') );

    var sanitizedIframeDom = $('<div>'+ sanitizedHtml + '</div>').find('iframe').get(0);

    if(sanitizedIframeDom){
      //iframe here
      this.$el.find('.gadget-embed').html( sanitizedIframeDom );

    } else {
      //no iframe, error out
      //note invoking the compiled error template here
      this.$el.find('.gadget-embed').html( JST["assets/templates/error.hbs"]() );
    }

  },

  render: function(){
    this.$el.html( this.template() );

    this.delegateEvents();
    return this;
  }
});
