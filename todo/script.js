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
