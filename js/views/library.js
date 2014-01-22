var app = app || {};

app.LibraryView = Backbone.View.extend({
    el: '#books',
    initialize: function(initialBooks) {
        this.collection = new app.Library(initialBooks);
        this.render();

        // make the view render again when a new model is added
        this.listenTo( this.collection, 'add', this.renderBook );
    },

    events: {
        'click #add': 'addBook'
    },
    addBook: function(e){
        e.preventDefault();

        var formData = {};

        // We select all the input elements of the form that have a value and iterate over
        // them using jQuery’s each. Since we used the same names for ids in our form as the
        // keys on our Book model we can simply store them directly in the formData object.
        $('#addBook div').children('input').each(function(i,el) {
            // We skip fields without a value so that the defaults will be applied.
            if($(el).val() != '') {
                formData[el.id] = $(el).val();
            }
        });

        //console.log(formData);
        this.collection.add(new app.Book(formData));
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