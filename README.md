# TemplateView

[![stability][0]][1]
[![Bower version][2]][3]

TemplateView is an extension of [Backbone][4]'s View class which is inspired by
[Marionette][5] and [React][6].  It aims to enable a [Flux][7] inspired architechture
built around Backbone's core components.

The extension aims to offer template designers more control over user experience
while staying outside of the core codebase. It is built around the use of inline
templates as a means of efficient prototyping.

At it's core it shares a few things in common with libraries like React.  It is
designed to render all nested views in the event of any state change.  Much like
how React works with a virtual dom to allow for this, TemplateView works with the
concept of [DOM diffing][8]. Where it differs is that instead of combining views
and templates via JSX, TemplateView keeps views simple and aims for most of the 
work to occur in the templates.  All you really need is a smart schema design to
drive your templates.

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
