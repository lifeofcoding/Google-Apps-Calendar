(function(App) {
	'use strict';
	App.module("googleAPI", {
		/**
		  * @desc Called automatically when this instance is created
		  * @param string moduleName (GoogleAPI)  - passed automatically via marionettejs
		  * @param object app - app object - passed automatically via marionettejs
		  * @param object options - passes this modules methods - passed automatically via marionettejs
		*/
		initialize: function(moduleName, app, options) {
			/* Move this up so it can be accessed via App.googleAPI.methodname instead of App.googleAPI.options.methodName */
			var key;
			for (key in options) {
				if(key !== 'initialize'){
					this[key] = options[key];
				}
			}

			window.loginCallback = this.options.loginCallback; //added to global for google's api login event
		},

		/* login event called when user clicks the login to google button */
		login: function() {
			var params = {
				'clientid': '263911259079-7tcjorsuo6gh57fvf75d7v5rsd9436js.apps.googleusercontent.com',
				'cookiepolicy': 'single_host_origin',
				'callback': 'loginCallback',
				'approvalprompt': 'force',
				'scope': 'https://www.googleapis.com/auth/calendar'
			};
			gapi.auth.signIn(params);
		},

		/* callback for when they authorized the app */
		loginCallback: function(result) {
			if(result.error){
				console.error('Google Reponse:' + result.error);
				App.vent.trigger('error', result.error);
			}else{
				try {
					gapi.client.load('calendar', 'v3',function(){
						var request = gapi.client.calendar.events.list({
							'calendarId': 'primary'
						});

						App.Model.Events.reset();
						request.execute(function(resp) {
							/* Add the google calendar events to our events collection (App.Model.Events) */
							for (var i = 0; i < resp.items.length; i++) {
								App.Model.Events.add(resp.items[i]);
							}
							//Render the calendar with the new events
							App.vent.trigger('show:content', new App.View.Calendar());
							$('#googleLogin').remove(); //Remove the google login button
							App.googleLoggedIn = true;
						});
					});
				} catch (error) {
					console.error("Something went wrong loggin into google: ", error);
				}
			}
		}
	});
})(window.App);
