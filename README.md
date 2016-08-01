# TemplateView

[![stability][0]][1]
[![Bower version](https://badge.fury.io/bo/templateview.svg)](https://badge.fury.io/bo/templateview)

TemplateView is an extension of [Backbone][4]'s View class which is inspired by
[Marionette][5] and [React][6].  It aims to enable a Flux inspired architechture
built around Backbone's core components.

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

### Example

##### HTML

```
<!DOCTYPE html>

<title>TempalteView</title>

<link rel="stylesheet" href="vendor/todomvc-app-css/index.css">
<link rel="stylesheet" href="style.css">

<footer class="info">
    <p>Double-click to edit a todo</p>
    <p>Built with <a href="https://github.com/howardroark/TemplateView">TemplateView</a> for <a href="http://todomvc.com">TodoMVC</a></p>
</footer>

<script type="text/javascript" src="vendor/jquery/dist/jquery.js"></script>
<script type="text/javascript" src="vendor/underscore/underscore.js"></script>
<script type="text/javascript" src="vendor/backbone/backbone.js"></script>
<script type="text/javascript" src="vendor/morphdom/dist/morphdom-umd.js"></script>
<script type="text/javascript" src="vendor/nunjucks/browser/nunjucks.js"></script>
<script type="text/javascript" src="templateview.js"></script>

<script type="text/javascript" src="vendor/backbone.localStorage/backbone.localStorage.js"></script>

<script type="text/javascript" src="script.js"></script>

<script type="text/template" id="mainView" data-prepend-to="body">
    <section class="todoapp {{ filter }}">
        <header class="header">
            <h1>todos</h1>
        </header>
        <section class="main">
            <input class="toggle-all" id="toggle-all" type="checkbox">
            <ul class="todo-list"></ul>
        </section>
        {% if allItems > 0 %}
        <footer class="footer">
            <span class="todo-count"><strong>{{ activeItems }}</strong> items left</span>
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
        </footer>
        {% endif %}
    </section>
</script>

<script type="text/template" id="formView" data-insert-after="& header h1">
    <form>
        <input class="new-todo" placeholder="What needs to be done?" autofocus="">
    </form>
</script>

<script type="text/template" id="itemView" data-append-to="& .todo-list">
    {% if isEditing %}
    <li class="{{ status }} editing">
    {% else %}
    <li class="{{ status }}">
    {% endif %}
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

##### CSS

```
.completed .active {
  display: none;
}
.active .completed {
  display: none;
}
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
        '':          'all',
        'completed': 'completed',
        'active':    'active'
    },
    all: function() {
        state.save({
            filter: 'all'
        });
    },
    completed: function() {
        state.save({
            filter: 'completed'
        });
    },
    active: function() {
        state.save({
            filter: 'active'
        });
    }
});

var router = new Router();

// UI
var FormView = TemplateView.extend({
    template: '#formView',
    events: {
        'submit':'submit'
    },
    submit: function(e) {
        var todo = new Todo({
            status: "active",
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
        'dblclick':'edit',
        'submit .editForm':'update',
        'click .toggle':'toggle',
        'click .destroy':'destroy'
    },
    edit: function(e) {
        this.model.save({
            isEditing: true 
        });
    },    
    update: function(e) {
        this.model.save({
            isEditing: false,
            label: e.target[0].value
        });
        return false;
    },
    toggle: function(e) {
        var status = 'active';
        if(e.target.checked) {
            status = 'completed';
        }
        this.model.save({
            status: status 
        });
    },
    destroy: function(e) {
        this.model.destroy();
    }
});

var MainView = TemplateView.extend({
    ChildView: ItemView,
    SubViews: [FormView],
    model: state,
    collection: todos,
    template: '#mainView',
    templateContext: function() {
        return {
            allItems: this.collection.length,
            activeItems: this.collection.where({ status: 'active' }).length
        }
    }
});

var main = new MainView();

$(function() {
    Backbone.history.start();
    state.fetch();
    todos.fetch();
    main.render();
});
```

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://github.com/patrick-steele-idem/morphdom
[3]: https://github.com/howardroark/TemplateView/tree/gh-pages
[4]: https://github.com/jashkenas/backbone
[5]: https://github.com/marionettejs/backbone.marionette
[6]: https://github.com/facebook/react
