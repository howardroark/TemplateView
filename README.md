# TemplateView

[![stability][0]][1]
[![Bower version][2]][3]

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

> Note: This is still experimental, but that also means you can help make it better!
> Nothing is set in stone and all discussion and feedback is welcomed with enthusiasm.

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

### Install

```
$ bower install templateview
```

### Develop

```
$ npm install
$ npm start
```

### Example

You can find the example todo app code [here][10].

##### HTML

```
<!DOCTYPE html>

<title>TempalteView</title>

<link rel="stylesheet" href="vendor/todomvc-app-css/index.css">

<!-- Requires jquery, underscore, backbone, morphdom, and nunjucks -->
<script type="text/javascript" src="vendor/jquery/dist/jquery.js"></script>
<script type="text/javascript" src="vendor/underscore/underscore.js"></script>
<script type="text/javascript" src="vendor/backbone/backbone.js"></script>
<script type="text/javascript" src="vendor/morphdom/dist/morphdom-umd.js"></script>
<script type="text/javascript" src="vendor/nunjucks/browser/nunjucks.js"></script>
<script type="text/javascript" src="templateview.js"></script>

<!-- Optional, but it's a great tool for persisting data -->
<script type="text/javascript" src="vendor/backbone.localStorage/backbone.localStorage.js"></script>

<script type="text/javascript" src="script.js"></script>

<!-- Each template tag requires a data attribute defining where it will be attached to the DOM -->
<script type="text/template" id="mainView" data-prepend-to="body">
    <div class="container">
        <!-- ^ Like React you always need a single container ^ -->
        <section class="todoapp">
            <header class="header">
                <h1>todos</h1>
            </header>
            <section class="main" {% if allItems == 0 %}style="display: none;"{% endif %}>
                <input class="toggle-all" id="toggle-all" type="checkbox" {% if activeItems == 0 and allItems != 0 %}checked{% endif %}>
                <ul class="todo-list"></ul>
            </section>
            <footer class="footer" {% if allItems == 0 %}style="display: none;"{% endif %}>
                <span class="todo-count"><strong>{{ activeItems }}</strong> item{% if activeItems > 1 %}s{% endif %} left</span>
                <ul class="filters">
                    <li>
                        <a {% if filter == "all" %}class="selected"{% endif %} href="#/">All</a>
                    </li>
                    <li>
                        <a {% if filter == "active" %}class="selected"{% endif %} href="#/active">Active</a>
                    </li>
                    <li>
                        <a {% if filter == "completed" %}class="selected"{% endif %} href="#/completed">Completed</a>
                    </li>
                </ul>
                <button class="clear-completed" {% if activeItems >= allItems %}style="display: none;"{% endif %}>Clear completed</button>
            </footer>
        </section>
        <footer class="info">
            <p>Double-click to edit a todo</p>
            <p>Built with <a href="https://github.com/howardroark/TemplateView">TemplateView</a> for <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
    </div>
</script>

<!-- The data attributes line up with jquery's attach methods (instertAfter, appendTo etc...) -->
<script type="text/template" id="formView" data-insert-after="& header h1">
    <form>
        <input class="new-todo" placeholder="What needs to be done?" autofocus="">
    </form>
</script>

<!-- Similar to SASS, "&" represents the "el" of the parent TemplateView -->
<script type="text/template" id="itemView" data-append-to="& .todo-list">
    {% if status == filter or filter == 'all' %}
        {% set display = 'block' %}
    {% else %}
        {% set display = 'none' %}
    {% endif %}

    {% if isEditing %}
        {% set className = status + ' editing' %}
    {% else %}
        {% set className = status %}
    {% endif %}

    <li class="{{ className }}" style="display: {{ display }};">
        <div class="view">
            <input class="toggle" type="checkbox" {% if status == "completed" %}checked{% endif %}>
            <label>{{ label }}</label>
            <button class="destroy"></button>
        </div>
        <form class="editForm">
            <input class="edit" value="{{ label }}">
        </form>
    </li>
</script>
```

##### JS

```
// Domain
var State = Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage('state'),
    defaults: {
        filter: 'all'
    }
});

var state = new State({id: 'todos'});

var Todo = Backbone.Model.extend({
    defaults: {
        status: 'active',
        isEditing: false
    }
});

var Todos = Backbone.Collection.extend({
    Model: Todo,
    localStorage: new Backbone.LocalStorage('todos')
});

var todos = new Todos();

var Router = Backbone.Router.extend({
    routes: {
        '*filter':'setFilter'
    },
    setFilter: function (filter) {
        if (filter === null) {
            filter = 'all';
        }
        state.save({
            filter: filter
        });
    }
});

new Router();

// UI
var FormView = TemplateView.extend({
    template: '#formView',
    events: {
        submit:'submit'
    },
    submit: function (e) {
        var todo = new Todo({
            status: 'active',
            label: e.target[0].value
        });
        this.collection.add(todo);
        todo.save();
        return false;
    }
});

var ItemView = TemplateView.extend({
    template: '#itemView',
    events: {
        dblclick:'edit',
        keydown: 'escape',
        'submit .editForm':'submitForm',
        'blur .edit':'blurInput',
        'click .toggle':'toggle',
        'click .destroy':'destroy'
    },
    edit: function (e) {
        this.model.save({
            isEditing: true
        });
        $(e.currentTarget).find('input').focus().select();
    },
    escape: function (e) {
        if (e.which === 27) {
            this.model.save({
                isEditing: false
            });
        }
    },
    submitForm: function (e) {
        this.update(e.target[0].value);
        return false;
    },
    blurInput: function (e) {
        this.update(e.target.value);
        return false;
    },
    update: function (label) {
        if (label === '') {
            this.model.destroy();
        } else {
            this.model.save({
                isEditing: false,
                label: label
            });
        }
    },
    toggle: function (e) {
        var status = 'active';
        if (e.target.checked) {
            status = 'completed';
        }
        this.model.save({
            status: status
        });
    },
    destroy: function (e) {
        this.model.destroy();
    }
});

var MainView = TemplateView.extend({
    ChildView: ItemView,
    SubViews: [FormView],
    state: state,
    collection: todos,
    template: '#mainView',
    templateContext: function () {
        return {
            allItems: this.collection.length,
            activeItems: this.collection.where({ status: 'active' }).length
        };
    },
    events: {
        'click .toggle-all':'toggleAll',
        'click .clear-completed':'clearCompleted'
    },
    toggleAll: function () {
        var activeItems = this.collection.where({ status: 'active' });
        var status = 'completed';
        if (activeItems.length === 0) {
            status = 'active';
        }
        for (var i = 0; i < this.collection.length; i++) {
            this.collection.models[i].save('status', status);
        }
    },
    clearCompleted: function () {
        var completedItems = this.collection.where({ status: 'completed' });
        for (var i = 0; i < completedItems.length; i++) {
            completedItems[i].destroy();
        }
        return false;
    }
});

var main = new MainView();

$(function () {
    Backbone.history.start();
    state.fetch();
    todos.fetch();
    main.render();
});
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
