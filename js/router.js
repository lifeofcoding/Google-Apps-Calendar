(function(App) {
	'use strict';
	var router = Backbone.Marionette.AppRouter.extend({
		controller: new App.Controller.Routes(),
		
		currentController: null,
		
		initialize: function(options) {},
		appRoutes: {
			'': 'index',
			'*path': 'index' //needs to be last so this does not steal route of others
		},
		
		onRoute: function(){}
	});

	App.Router = new router();

	Backbone.history.start({
		pushState: true,
		root: '/'
	});

})(window.App);
