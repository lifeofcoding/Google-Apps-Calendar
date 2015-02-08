(function(App) {
	'use strict';
	var _this;

	var viewport = Backbone.Marionette.LayoutView.extend({
		template: '#viewport-tpl',

		id: 'viewport',

		/* Quick access to ui elements */
		ui: {
			createNewEvent: '#create-new',
			googleLogin: '.google_login',
			jumpToDate: '#goto-date'
		},

		/* Our main regions we will be loading our views into */
		regions: {
			Header: '#header',
			Content: '#content',
			Footer: '#footer'
		},

		/* Our listers marionettejs will attach for us */
		events: {
			'click @ui.createNewEvent': 'createNewEvent',
			'click @ui.googleLogin': 'googleLogin',
			'click @ui.jumpToDate': 'jumpToDate'
		},

		initialize: function() {
			/* Healper event to display content - is passed the view object */
			App.vent.on('show:content', _.bind(this.showContent, this));
			App.vent.on('error', _.bind(this.showErrorMessage, this));
		},

		/**
		  * @desc this triggers our createNewEvent modal to show. (events controller)
		  * @param object e - the click event
		*/
		createNewEvent: function(e){
			e.preventDefault(); // No page jumping! >:}
			App.vent.trigger('show:newEvent');
		},

		/**
		  * @desc this triggers our jumpToDate modal to show. (calendar controller)
		  * @param object e - the click event
		*/
		jumpToDate: function(e){
			e.preventDefault(); // No page jumping! >:}
			App.vent.trigger('show:jumpToDate');
		},

		/* Go ahead and load our views into the regions */
		onShow: function() {
			this.Header.show(new App.View.Header());
			this.Content.show(new App.View.Calendar());
			this.Footer.show(new App.View.Footer());
		},

		/* Healper function to display a view object in content region */
		showContent: function(view){
			this.Content.show(view);
		},

		showErrorMessage: function(message){
			if(typeof message === 'undefined' || message === null){
				console.warn('Atempted to display error message without a message value!');
			}else{
				$.growl('<strong>Error:</strong> ' + message, {
					type: 'danger',
					z_index: '9999'
				});
			}
		}
	});

	App.View.Viewport = viewport;
})(window.App);
