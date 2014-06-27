module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    globalConfig: {
      scssFile: 'public/assets/sass/application.scss',
      cssFile: 'public/assets/stylesheets/application.css',
      htmlFile: 'public/index.html'
    },

    // CSS
    sass: {
      dist: {
        options: {
          style: 'expanded',
          loadPath: 'node_modules/govuk_frontend_toolkit/govuk_frontend_toolkit/stylesheets'
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
    },

    smoosher: {
      all: {
        options: {
          jsTags: {
            start: '<script type="text/javascript">'
          }
        },
        files: {
          'public/offline-index.html': 'public/index.html',
        }
      }
    }
  
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html-smoosher');

  
  grunt.registerTask('default', ['watch']);

  grunt.registerTask('offline', 'Creates a single html file with everything inlined.', function() {
      
    grunt.log.writeln('Beginning offline build.');
    grunt.task.run('sass');

    grunt.log.writeln('Inlining...');
    grunt.task.run('smoosher');

  });

};