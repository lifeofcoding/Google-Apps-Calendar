(function(App) {
	'use strict';

	var events = Backbone.Collection.extend({
		initialize: function(){
			/* Add our preloaded data for this hard-coded user */
			this.add(window.preloadData);
		}
	});
	App.Model.Events = new events();
})(window.App);
