Flatdoc template
=========

This is a sample template for [grunt-bulldoc](https://github.com/equiet/grunt-bulldoc).

This should be your starting point. Simply copy this template and start filling it with your content.

Build
---------

This theme uses [Stylus](http://learnboost.github.io/stylus/). You can:

*  edit exported CSS (not recommended) or
*  edit *Stylus* source files and then compile it using Grunt (yay)


### Compile Stylus

You will need [grunt-contrib-stylus](https://github.com/gruntjs/grunt-contrib-stylus) to do this. Follow their installation instructions.
Then make a `Gruntfile.js` task for it, like this:

``` js
grunt.loadNpmTasks('grunt-contrib-stylus');

grunt.initConfig({
  stylus: {
    flatdoc: {
      files: { 'YOUR_TEMPLATE_DIR/assets/style.css': ['YOUR_TEMPLATE_DIR/assets/source/css/*.styl'] }
    }
  }
});
```

### Compile JavaScript

While you are there, you can make a task for concatenating JavaScript files using [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat):

``` js
grunt.loadNpmTasks('grunt-contrib-concat');

grunt.initConfig({
  concat: {
    flatdoc: {
      files: { 'YOUR_TEMPLATE_DIR/assets/script.js': ['YOUR_TEMPLATE_DIR/assets/source/js/*.js'] }
    }
  }
});
```


Markdown extras
---------------

Flatdoc offers a few harmless, unobtrusive extras that come in handy in building
documentation sites.

#### Code highlighting

You can use Markdown code fences to make syntax-highlighted text. Simply
surround your text with three backticks. This works in GitHub as well.
See [GitHub Syntax Highlighting](https://help.github.com/articles/github-flavored-markdown#syntax-highlighting) for more info.

  ``` html
  <html>
    <head>
      <script src='script.js'></script>
      <link href='style.css' rel='stylesheet'>
    </head>
    <body>
      <div class="class">
        <p>Paragraph.</p>
      </div>
    </body>
  </html>
  ```

#### Blockquotes

Blockquotes show up as side figures. This is useful for providing side
information or non-code examples.

> Blockquotes are blocks that begin with `>`.

#### Smart quotes

Single quotes, double quotes, and double-hyphens are automatically replaced to
their typographically-accurate equivalent. This, of course, does not apply to
`<code>` and `<pre>` blocks to leave code alone.

> "From a certain point onward there is no longer any turning back. That is the
> point that must be reached."
> --Franz Kafka

#### Buttons

If your link text has a `>` at the end (for instance: `Continue >`), they show
up as buttons.

> [Button >](#)

Customizing
===========

Mandatory subheading
--------------------

### Theme options

For the default theme (*theme-white*), You can set theme options by adding
classes to the `<body>` element. The available options are:

#### big-h3
Makes 3rd-level headings bigger.

``` html
<body class='big-h3'>
```

#### no-literate
Disables "literate" mode, where code appears on the right and content text
appear on the left.

``` html
<body class='no-literate'>
```

#### large-brief
Makes the opening paragraph large.

``` html
<body class='large-brief'>
```

### Adding more markup

You have full control over the HTML file, just add markup wherever you see fit.
As long as you leave `role='flatdoc-content'` and `role='flatdoc-menu'` empty as
they are, you'll be fine.

Here are some ideas to get you started.

 * Add a CSS file to make your own CSS adjustments.
 * Add a 'Tweet' button on top.
 * Add Google Analytics.
 * Use CSS to style the IDs in menus (`#acknowledgements + p`).

### JavaScript hooks

Flatdoc emits the events `flatdoc:loading` and `flatdoc:ready` to help you make
custom behavior when the document loads.

``` js
$(document).on('flatdoc:ready', function() {
  // I don't like this section to appear
  $("#acknowledgements").remove();
});
```

Acknowledgements
================

Mandatory subheading
--------------------

Original Flatdoc theme by [Rico Sta. Cruz](http://ricostacruz.com) and [contributors](http://github.com/rstacruz/flatdoc/contributors). Released under the [MIT
License](http://www.opensource.org/licenses/mit-license.php).

Modified for [grunt-bulldoc](https://github.com/equiet/grunt-bulldoc) by [Equiet](https://github.com/equiet/).
