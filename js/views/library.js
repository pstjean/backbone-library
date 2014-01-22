var app = app || {};

app.LibraryView = Backbone.View.extend({
    el: '#books',
    initialize: function(initialBooks) {
        this.collection = new app.Library(initialBooks);
        this.render();
    },

    // render library by rendering each book in its collection
    render: function() {
        this.collection.each(function(item) {
            this.renderBook(item);
        }, this);
    },
    renderBook: function(item) {
        var bookView = new app.BookView({
            model: item
        });
        console.log(item);
        this.$el.append(bookView.render().el);
    }
});