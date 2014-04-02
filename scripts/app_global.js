/*global Educreations, $, _, Backbone */

//either global object or some kind of AMD/UMD
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
