module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        mangle: true,
        compress: true,
        report: 'gzip',
        sourceMap: true
      },
      build: {
        src: 'utils.js',
        dest: 'public/utils.js'
      }
    },

    browserify: {
      dist: {
        files: {
          'public/utils.js': ['utils.js'],
          'public/test/utils-spec.js': ['test/utils-spec.js']
        }
      }
    },

    watch: {
      scripts: {
        files: ['**/*'],
        tasks: ['browserify', 'uglify', 'jasmine_node'],
        options: {
          spawn: false,
        },
      },
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['browserify', 'uglify', 'watch']);

};