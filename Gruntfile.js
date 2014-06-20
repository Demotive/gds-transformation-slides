module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    globalConfig: {
      scssFile: 'public/assets/sass/application.scss',
      cssFile: 'public/assets/stylesheets/application.css',
      htmlFile: 'public/index.html'
    },

    // Copies assets from external modules and dirs
    copy: {
      govuk_frontend_toolkit: {
        expand: true,
        src: '**',
        cwd: 'node_modules/govuk_frontend_toolkit/govuk_frontend_toolkit/stylesheets/',
        dest: 'public/assets/sass/'
      }
    },

    // CSS
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          '<%= globalConfig.cssFile %>': '<%= globalConfig.scssFile %>'
        }
      }
    },

    watch: {
        css: {
            files: ['<%= globalConfig.scssFile %>'],
            tasks: ['sass'],
            options: {
                spawn: false,
            }
        }
    }
  
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  
  grunt.registerTask('default', ['watch']);
  
  grunt.registerTask('init', ['copy']);

};