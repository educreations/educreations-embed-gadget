module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    paths: {
      index: '.'
    },
    handlebars: {
      compile: {
        options: {
          namespace: 'JST'
        },
        files: {
          '<%= paths.index %>/templates.js' : ['templates/*.hbs']
        }
      }
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
      handlebars: {
        files: [
          '<%= paths.index %>/templates/*.hbs'
        ],
        tasks: ['handlebars']
      },
      tests: {
        files: ['<%= paths.index %>/test/**/*.js'],
        tasks: ['mocha']
      }
    }
  });

  grunt.registerTask('createDefaultTemplate', function () {
    grunt.file.write('./templates.js', 'this.JST = this.JST || {};');
    //todo, remove hard coded path
  });

  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-handlebars');

  grunt.registerTask('default', ['createDefaultTemplate', 'handlebars', 'mocha', 'watch']);
};
