/*
 * grunt-bulldoc
 * https://github.com/equiet/grunt-bulldoc
 *
 * Copyright (c) 2013 Jakub Jurových
 * Licensed under the MIT license.
 */

'use strict';


var path = require('path'),
    marked = require('marked'),
    mustache = require('mustache'),
    ncp = require('ncp').ncp,
    highlight = require('highlight.js');


// Setup marked
marked.setOptions({
  highlight: function(code, lang, cb) {
    return highlight.highlightAuto(code, lang).value;
  }
});


module.exports = function(grunt) {

  grunt.registerMultiTask('bulldoc', 'Generate HTML code from Markdown.', function() {

    // This is a async task
    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      templateDir: 'template/',
      template: 'template.html'
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {

      // Handle only first src
      if (f.src.length !== 1) {
        grunt.fail.warn('Only 1 source can be parsed. You have provided ' + f.src.length + ' sources.');
      }

      // Get source filepath
      var sourcePath = f.src[0];

      // Make sure all needed files exist

      if (!grunt.file.isDir(sourcePath)) {
        grunt.fail.warn('Source file "' + sourcePath + '" has to be a directory.');
      }

      var templateDir = path.join(sourcePath, options.templateDir);
      if (!grunt.file.isDir(templateDir)) {
        grunt.fail.warn('Template directory "' + templateDir + '" should exist.');
      }

      var templatePath = path.join(templateDir, options.template);
      if (!grunt.file.exists(templatePath)) {
        grunt.fail.warn('Template file "' + templatePath + '" should exist.');
      }

      // Copy template files
      grunt.file.mkdir(f.dest);
      ncp(templateDir, f.dest, function(err) {

        if (err) {
          grunt.fail.warn('Error while copying template files from "' + templateDir + '" to "' + f.dest + '": ' + err);
        }

        // Remove template file
        grunt.file.delete(path.join(f.dest, options.template));

        // Read main template file
        var template = grunt.file.read(templatePath);

        // Get Markdown files
        var mdFiles = grunt.file.expand(path.join(sourcePath, '*.md'));

        mdFiles.forEach(function(filepath) {

          // Get name of the file
          var name = filepath.split('/').pop().replace(/\.md$/, '.html');

          // Read Markdown file
          var file = grunt.file.read(filepath);

          // Parse Markdown
          var parsed = marked(file);

          // Insert markdown into template
          template = mustache.render(template, {content: parsed});

          // Write template
          var dest = path.join(f.dest, name);
          grunt.file.write(dest, template);

          // Print a success message.
          grunt.log.writeln('File "' + dest + '" created.');

        });

        done();

      });

    });

  });

};
