this["JST"] = this["JST"] || {};

this["JST"]["templates/app.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"gadget-embed\"></div>\n";
  });

this["JST"]["templates/error.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"gadget-embed-not-valid\">\n  <div class=\"gadget-embed-not-valid-undefined-url\">\n    Please specify the embed code\n  </div>\n</div>\n";
  });