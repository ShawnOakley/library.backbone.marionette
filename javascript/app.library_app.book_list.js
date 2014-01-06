MyApp.LibraryApp.BookList = function(){
	var BookList = {};

	  var BookView = Backbone.Marionette.ItemView.extend({
	    template: "#book-template"
	  });

	var BookListView = Backbone.Marionette.CompositeView.extend({
		template: '#book-list-template',
		id: 'bookList',
		itemView: BookView,

		appendHtml: function(collectionView, itemView){
		collectionView.$('.books').append(itemView.el);
		}
	});


  var SearchView = Backbone.View.extend({
    el: "#searchBar",

    initialize: function(){
    	var self = this;
    	var $spinner = self.$('#spinner');
    	MyApp.vent.on('search:start', function(){ $spinner.fadeIn(); });
    	MyApp.vent.on('search:stop', function(){ $spinner.fadeOut(); });
    },
    
    events: {
      'change #searchTerm': 'search'
    },
    
    search: function() {
      var searchTerm = this.$('#searchTerm').val().trim();
      MyApp.vent.trigger('search:term', searchTerm);
    }
  });

	BookList.showBooks = function(books){
		var bookListView = new BookListView({ collection: books });
		MyApp.LibraryApp.layout.books.show(bookListView);
	};

	MyApp.vent.on('layout:rendered', function(){
	// render a view for the existing HTML in the template, and attach it to the layout (i.e. don't double render)
		var searchView = new SearchView();
		MyApp.LibraryApp.layout.search.attachView(searchView);
	})

	return BookList;
}();

MyApp.vent.on("layout:rendered", function(){
  MyApp.LibraryApp.BookList.showBooks(MyApp.LibraryApp.Books);
});

