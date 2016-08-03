# TemplateView

[![stability][0]][1]
[![Bower version][2]][3]

## What?

TemplateView is an extension of [Backbone][4]'s View class which is inspired by
[Marionette][5] and [React][6].  It aims to enable a [Flux][7] style architechture
built around Backbone's core components. Essentially you create a tree of
View/Templates and render it each time the data's state changes.  This offers the
opportunity to design schemas that work really well with templates.

The extension aims to offer template designers more control over user experience
while staying outside of the core codebase. It is built around the use of inline
templates as a means of efficient prototyping.  The template sandbox offers just
enough logic to set up the various UI states that an app may require.

Much like how React works with a virtual dom to allow for this, TemplateView works
with the [morphdom][8] to accomplish DOM diffing.

You can find an example "todomvc" app [here][9].

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
[8]: https://github.com/patrick-steele-idem/morphdom
[9]: https://github.com/howardroark/TemplateView/tree/gh-pages
