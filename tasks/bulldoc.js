/*
 * grunt-bulldoc
 * https://github.com/equiet/grunt-bulldoc
 *
 * Copyright (c) 2013 Jakub Jurových
 * Licensed under the MIT license.
 */

'use strict';


var marked = require('marked'),
    mustache = require('mustache'),
    ncp = require('ncp').ncp,
    highlight = require('highlight.js');


module.exports = function(grunt) {

  grunt.registerMultiTask('bulldoc', 'Generate HTML code from Markdown.', function() {

    // This is a async task
    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      templateDir: 'template/',
      template: 'index.html'
    });
    options.templateDir += '/';

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      f.dest += '/';

      // Handle only first src
      if (f.src.length !== 1) {
        grunt.fail.warn('Only 1 source can be parsed. You have provided ' + f.src.length + ' sources.');
      }

      // Get source filepath
      var sourcePath = f.src[0] + '/';

      // Make sure all needed files exist

      if (!grunt.file.isDir(sourcePath)) {
        grunt.fail.warn('Source file "' + sourcePath + '" has to be a directory.');
      }

      var templateDir = sourcePath + options.templateDir;
      if (!grunt.file.isDir(templateDir)) {
        grunt.fail.warn('Template directory "' + templateDir + '" should exist.');
      }

      var templatePath = templateDir + options.template;
      if (!grunt.file.exists(templatePath)) {
        grunt.fail.warn('Template file "' + templatePath + '" should exist.');
      }

      // Copy template files
      grunt.file.mkdir(f.dest);
      ncp(templateDir, f.dest, function(err) {

        if (err) {
          grunt.fail.warn('Error while copying template files from "' + templateDir + '" to "' + f.dest + '": ' + err);
        }

        // Read main template file
        var template = grunt.file.read(templatePath);

        // Get Markdown files
        var docs = grunt.file.expand(sourcePath + '*.md').map(function(path) {
          return grunt.file.read(path);
        });

        // Parse Markdown
        marked.setOptions({
          highlight: function(code, lang, cb) {
            return highlight.highlightAuto(code, lang).value;
          }
        });
        var parsed = marked(docs.join("\n"));

        // Insert markdown into template
        template = mustache.render(template, {content: parsed});

        // Write template
        grunt.file.write(f.dest + options.template, template);

        // Print a success message.
        grunt.log.writeln('File "' + f.dest + options.template + '" created. Parsed ' + docs.length + ' .md files.');

        done();

      });

    });

  });

};
