/*global Educreations, $, _, Backbone, JST */

Educreations.Views.AppView = Backbone.View.extend({
  template: JST["assets/templates/app.hbs"],

  events:{
    "click .test": "onTest"
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

  onTest: function(){
    console.log('test', this.model.attributes);
  },

  renderEmbedCode: function(){
    this.$el.find('.embed-container').html( this.model.get('embedCode') );
  },

  render: function(){
    this.$el.html( this.template() );

    this.delegateEvents();
    return this;
  }
});
