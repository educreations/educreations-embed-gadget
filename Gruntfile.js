module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    paths: {
      index: 'assets'
    },
    handlebars: {
      compile: {
        options: {
          namespace: 'JST'
        },
        files: {
          '<%= paths.index %>/templates.js' : ['<%= paths.index %>/templates/*.hbs']
        }
      }
    },
    watch: {
      options: {
        spawn: false
      },
      handlebars: {
        files: [
          '<%= paths.index %>/templates/*.hbs'
        ],
        tasks: ['handlebars']
      }
    }
  });

  grunt.registerTask('createDefaultTemplate', function () {
    grunt.file.write('./assets/templates.js', 'this.JST = this.JST || {};');
    //todo, remove hard coded path
  });

  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-handlebars');

  grunt.registerTask('default', ['createDefaultTemplate', 'handlebars', 'watch']);
};
