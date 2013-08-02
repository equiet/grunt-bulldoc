/*
 * grunt-bulldoc
 * https://github.com/equiet/grunt-bulldoc
 *
 * Copyright (c) 2013 Jakub Jurových
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    bulldoc: {
      copy_template: {
        files: { 'tmp/copy_template/': 'test/fixtures/copy_template/' }
      },
      copy_template_options: {
        options: {
          templateDir: 'test_template/',
          template: 'test_template.html'
        },
        files: { 'tmp/copy_template_options/': 'test/fixtures/copy_template_options/' }
      },
      markdown: {
        files: { 'tmp/markdown/': 'test/fixtures/markdown/' }
      },
      markdown_html: {
        files: { 'tmp/markdown_html/': 'test/fixtures/markdown_html/' }
      },
      flatdoc_example: {
        files: { 'example/flatdoc': 'templates/flatdoc' }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },

    // Build templates.
    stylus: {
      flatdoc: {
        files: { 'templates/flatdoc/template/assets/style.css': ['templates/flatdoc/template/assets/source/css/*.styl'] }
      }
    },
    concat: {
      flatdoc: {
        files: { 'templates/flatdoc/template/assets/script.js': ['templates/flatdoc/template/assets/source/js/*.js'] }
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'bulldoc', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

  // Bulid flatdoc template.
  grunt.registerTask('flatdoc', ['clean', 'stylus:flatdoc', 'concat:flatdoc', 'bulldoc:flatdoc_example']);

};
