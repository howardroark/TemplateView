# TemplateView [![stability][0]][1]

TemplateView is an extension of Backbone's View class which is inspired by
Marionette and React.

The extension aims to offer template designers more control over user experience
while staying outside of the core codebase. It is built around the use of inline
templates as a means of efficient prototyping.

At it's core it shares a few things in common with libraries like React.  It is
designed to render all nested views in the event of any state change.  Much like
how React works with a virtual dom to allow for this, TemplateView works with the
concept of [DOM diffing][2]. Where it differs is that instead of combining views
and templates via JSX, TemplateView keeps views simple and aims for most of the 
work to occur in the templates.  All you really need is a smart schema design to
drive your templates.

You can find an example "todomvc" app [here][3].

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
[2]: https://github.com/patrick-steele-idem/morphdom
[3]: https://github.com/howardroark/TemplateView/tree/gh-pages
