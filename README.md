# TemplateView

[![Join the chat at https://gitter.im/howardroark/TemplateView](https://badges.gitter.im/howardroark/TemplateView.svg)](https://gitter.im/howardroark/TemplateView?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

### Example

[Code](https://github.com/howardroark/TemplateView/blob/gh-pages/index.html) / [Demo](https://howardroark.github.io/TemplateView/)

## What?

TemplateView is an extension of [Backbone][4]'s View class, and is inspired by
[Marionette][5] and [React][6].  It aims to enable you to build a [Flux][7] style
architechture with Backbone's core components. Essentially you create a tree of
View+Template combos and render the entire tree each time the data's state changes.
This offers the opportunity to design schemas that work really well with templates
and keep views small.

The extension aims to offer template designers more control over user experience
while staying outside of the core codebase. It is built around the use of inline
templates as a means of efficient prototyping.  The default template engine is 
[Nunjucks][8], which offers a great sandbox with just enough logic to set up the
various UI states that an app may require.

Much like how React works with a virtual dom to allow for this, TemplateView works
with [morphdom][9] to accomplish DOM diffing.

## Usage

### Views

TemplateView requires pairity between Views and Templates, where each View must be 
associated with a unique Template. Each extended View can be passed to another one
as `ChildView`, or as part of the `SubViews` array.  The top most contructed View is
known as the `ancestorView` and is reposible for constructing and rendering all of it's
decendents. A ChildView is a single extended Class that is acted upon when a contructed 
`collection` is also passed to it's `parentView` as a constructor option. Each item
in the collection is contrcuted a ChildView, and the appropriate model is passed into
the Template context. Each extended SubView Class is passed as part of an array, and each
item in the array is contructed a View and rendered appropriately. Each View contructor
must also be passed a `template` selector string to find the Template in the DOM.

### Data

If any View is passed a constructed `model` as a contructor option, it's data will
automatically become a part of the Template context.  Any changes to the state of
that data will trigger a full render of the tree. Subsiquently any changes to the
state of a `collection` will trigger a render as well. The ancestor View can be passed 
a unique constructed model known as the `state`.  This data will be extended into
every Template context within the tree and changes to it will also trigger a new
tree render.  Additionally each View can be passed a `templateContext` constructor
option as a function which returns dynamic data to the Template context.  If any
View is not passed a `model` option then it will take on the `model` option of it's
parent if available.

### Templates

Templates must be available in the DOM as `script` tags. Each template `script` tag
must have a data attriube which describes where it should be attached to the DOM as
rendering occurs.  The data attributes are mapped to jquery's `appendTo`, `prependTo`,
`insertAfter`, and `insertBefore` in the format of `data-append-to`, `data-prepend-to`,
`data-insert-after`, and `data-insert-before`. Much like React each Template must contain
a single enclosed DOM element. All templates are parsed with the help of [Nunjucks][8].
Nunjucks is a nicely sandboxed template engine that is also known as Jinja and Twig in 
the Python and PHP communities respectively.


[0]: https://img.shields.io/badge/stability-stable-green.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://badge.fury.io/bo/templateview.svg
[3]: https://badge.fury.io/bo/templateview
[4]: https://github.com/jashkenas/backbone
[5]: https://github.com/marionettejs/backbone.marionette
[6]: https://github.com/facebook/react
[7]: https://facebook.github.io/flux/docs/overview.html
[8]: https://github.com/mozilla/nunjucks
[9]: https://github.com/patrick-steele-idem/morphdom
[10]: https://howardroark.github.io/TemplateView/
[11]: https://github.com/howardroark/TemplateView/tree/gh-pages
