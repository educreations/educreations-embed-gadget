module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'bower_components/underscore/underscore.js',
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/backbone/backbone.js',
      'scripts/app_global.js',
      'scripts/app_view.js',
      'scripts/gadget_main.js',
      'test/main_spec.js'
    ],
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Firefox']
  });
};
