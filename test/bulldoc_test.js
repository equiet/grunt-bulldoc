'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.bulldoc = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  copy_template: function(test) {
    test.expect(3);

    test.ok(grunt.file.exists('tmp/copy_template/index.html'), 'index.html should exist.');
    test.ok(grunt.file.exists('tmp/copy_template/folder/'), 'folder/ should exist.');
    test.ok(grunt.file.exists('tmp/copy_template/folder/test.txt'), 'folder/test.txt should exist.');

    test.done();
  },
  copy_template_options: function(test) {
    test.expect(3);

    test.ok(grunt.file.exists('tmp/copy_template_options/test_index.html'), 'test_index.html should exist.');
    test.ok(grunt.file.exists('tmp/copy_template_options/folder/'), 'folder/ should exist.');
    test.ok(grunt.file.exists('tmp/copy_template_options/folder/test.txt'), 'folder/test.txt should exist.');

    test.done();
  },
  markdown: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/markdown/index.html');
    var expected = grunt.file.read('test/expected/markdown/index.html');
    test.equal(actual, expected, 'Markdown file should be parsed into HTML.');

    test.done();
  },
  markdown_html: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/markdown_html/index.html');
    var expected = grunt.file.read('test/expected/markdown_html/index.html');
    test.equal(actual, expected, 'Markdown file should be parsed into HTML and merged with another HTML from the template.');

    test.done();
  }
};
