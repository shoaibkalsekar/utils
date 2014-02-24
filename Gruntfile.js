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
        src: 'dist/utils.js',
        dest: 'dist/utils.min.js'
      }
    },

    browserify: {
      dist: {
        files: {
          'dist/utils.js': ['src/utils.js'],
          'dist/test_spec/utils-spec.js': ['test_spec/utils-spec.js']
        }
      }
    },

    watch: {
      scripts: {
        files: ['**/*'],
        tasks: ['browserify', 'uglify'],
        options: {
          spawn: false,
        },
      },
    },

    jshint: {
      options : {
        jshintrc : ".jshintrc"
      },
      files: {
        src: ["utils.js"]
      }
    },

    clean: ["dist/utils*.js", "dist/test_spec/utils*.js", "dist/utils*.map"]

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['browserify', 'uglify', 'watch']);
  grunt.registerTask('strict-build', ['jshint','browserify', 'uglify', 'watch']);

};