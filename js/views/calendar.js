(function(App) {
	'use strict';

	var calendar = Backbone.Marionette.ItemView.extend({
		template: '#calendar-tpl',

		ui: {
			googleLogin: '#googleLogin'
		},

		events: {
			'click @ui.googleLogin': 'googleLogin',
		},

		/* My healper function for quick access to controller + auto initialization when needed */
		controller: function(){
			return new App.Controller.Calendar({view:this}); // Gets passed this view 
		},
		
		
		
		initialize: function(){
			this.controller = this.controller();
		},
		
		onRender: function(){},
		
		/* We want to render the calendar as soon as this has been shown */
		onShow: function() {
			this.controller.renderCalendar();
		},

		/* Display Google Auth window */
		googleLogin: function(){
			App.googleAPI.login()
		},

		onDestroy: function() {
			this.undelegateEvents(); //Remove event listeners when destoryed
		}

	});
	App.View.Calendar = calendar;
})(window.App);
