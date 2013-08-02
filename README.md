# grunt-bulldoc

> Beautiful documentation generator from Markdown files for Grunt

## Demo
http://htmlpreview.github.io/?https://github.com/equiet/grunt-bulldoc/blob/master/example/flatdoc/Readme.html

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-bulldoc --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-bulldoc');
```

## The "bulldoc" task

### Overview
In your project's Gruntfile, add a section named `bulldoc` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  bulldoc: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.templateDir
Type: `String`
Default value: `'template/'`

Name of the template directory in your documentation folder. You probably don't want to change this.

#### options.template
Type: `String`
Default value: `template.html`

Name of the HTML template, where parsed Markdown is injected. This file should be in `options.templateDir` folder. You probably don't want to change this either.

### Usage Examples

First, you will need a template which will be used to generate the documentation.
There is one already available in `templates/flatdoc`, or in `node_modules/grunt-bulldoc/templates/flatdoc`.
Copy files from this folder somewhere, for example into `docs/source/`.
Now you can edit this template however you want.
To generate the documentation, add this task into your Gruntfile:
```js
grunt.loadNpmTasks('grunt-bulldoc');
grunt.initConfig({
  bulldoc: {
    example: {
      files: { 'docs/result/': 'docs/source/' }
    }
  }
})
```

Your `docs/source/` folder can look like this:
```
template/
  template.html
  assets/
    ...
first-doc.md
second-doc.md
```

Then your `docs/results/` folder will look like this:
```
assets/
  ...
first-doc.html
second-doc.html
```

## Contributing
Sure.

## License
See `LICENSE-MIT`.

_(MIT, obviously.)_

## Acknowledgements

Original Flatdoc theme by [Rico Sta. Cruz](http://ricostacruz.com) and [contributors](http://github.com/rstacruz/flatdoc/contributors). Released under the [MIT
License](http://www.opensource.org/licenses/mit-license.php).
