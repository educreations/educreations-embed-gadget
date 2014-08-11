module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    paths: {
      index: '.'
    },
    mocha: {
      test: {
        src: ['<%= paths.index %>/test_runner.html'],
        options: {
          reporter: 'Spec',
          log: true,
          logErrors: true,
          run: true
        }
      }
    },
    watch: {
      options: {
        spawn: false
      },
      tests: {
        files: ['<%= paths.index %>/test/**/*.js'],
        tasks: ['mocha']
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['mocha', 'watch']);
};
