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
    stylus: {
      compile: {
        options: {
          compress: false,
          use: [ require('nib') ]
        },
        files: {
          '<%= paths.index %>/gadget.css': '<%= paths.index %>/css/gadget.styl'
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
      },
      styles: {
        //re-compile to css when .styl files change
        files: ['<%= paths.index %>/css/**/*.styl'],
        tasks: ['stylus']
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

  grunt.registerTask('default', ['createDefaultTemplate', 'handlebars', 'stylus', 'watch']);
};
