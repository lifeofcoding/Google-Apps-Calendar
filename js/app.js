var App = new Backbone.Marionette.Application();
_.extend(App, {
	Regions: {},
	Controller: {},
	View: {},
	Model: {},
	googleLoggedIn: false,
	Calendar: null
});

App.addRegions({
	viewport: '#wrapper'
});

App.addInitializer(function (options) {
	var mainWindow = new App.View.Viewport();
	try {
		App.viewport.show(mainWindow);
	} catch(e) {
		console.error('Couldn\'t start app: ', e, e.stack);
	}
});
