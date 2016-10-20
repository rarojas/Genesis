module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['browserify']);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      dist: {
        files: {
          'public/static/angular.js': ['node_modules/angular/angular.js'],
          'public/static/angular-resource.js': ['node_modules/angular-resource/angular-resource.js']
        }
      }
    }
  });
}
