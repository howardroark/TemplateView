# TemplateView

[![stability][0]][1]
[![Bower version][2]][3]

## What?

TemplateView is an extension of [Backbone][4]'s View class which is inspired by
[Marionette][5] and [React][6].  It aims to enable you to build a [Flux][7] style
architechture with Backbone's core components. Essentially you create a tree of
View+Template combos and render the entire tree each time the data's state changes.
This offers the opportunity to design schemas that work really well with templates
and keep views small.

The extension aims to offer template designers more control over user experience
while staying outside of the core codebase. It is built around the use of inline
templates as a means of efficient prototyping.  The default template engine is 
[Nunjucks][8] which offers a great sandbox with just enough logic to set up the
various UI states that an app may require.

Much like how React works with a virtual dom to allow for this, TemplateView works
with [morphdom][9] to accomplish DOM diffing.

> Note: This is still experimental, but that also means you can help make it better!

You can find an example "todomvc" app [here][10].

### Install

```
$ bower install templateview

```

### Develop

```
$ npm install
$ npm start
```

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://badge.fury.io/bo/templateview.svg
[3]: https://badge.fury.io/bo/templateview
[4]: https://github.com/jashkenas/backbone
[5]: https://github.com/marionettejs/backbone.marionette
[6]: https://github.com/facebook/react
[7]: https://facebook.github.io/flux/docs/overview.html
[8]: https://github.com/mozilla/nunjucks
[9]: https://github.com/patrick-steele-idem/morphdom
[10]: https://github.com/howardroark/TemplateView/tree/gh-pages
