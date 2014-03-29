/*global Educreations, $, _, Backbone, JST */

Educreations.Views.AppView = Backbone.View.extend({
  template: JST["assets/templates/app.hbs"],

  events:{
    "click .test": "onTest"
  },

  initialize: function(){
    console.log('initialize AppView');

    //author or leaner
    this.isEditable = false;

    //two event buses
    this.ventFromServer = _.extend({}, Backbone.Events);
    this.ventToServer = _.extend({}, Backbone.Events);

    //events
    this.listenTo(this.ventFromServer, 'attached', function(messageData){
      //set default configuration
      console.log('attached', messageData);
      this.setPropertySheet();
    });
    this.listenTo(this.ventFromServer, 'attributesChanged', function(messageData){
      console.log('attributesChanged', messageData);
    });
    this.listenTo(this.ventFromServer, 'setEditable', function(editable){
      console.log('setEditable', editable);
      this.isEditable = editable;
    });

    //child views

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
    console.log('test');
  },

  render: function(){
    this.$el.html( this.template() );

    this.delegateEvents();
    return this;
  }
});
