(function(App) {
	'use strict';
	var calendar = Marionette.Controller.extend({

		ui: {
			calendar: '#calendar-wrapper'
		},

		initialize: function(options) {},

		/* Called after event creations and updates to re-render the calendar (Google) */
		refreshCalendar: function(){
			var _this = this;
			App.Model.Events.reset();

			var request = gapi.client.calendar.events.list({
				'calendarId': 'primary'
			});

			request.execute(function(resp) {
				for (var i = 0; i < resp.items.length; i++) {
					console.log(resp.items[i]);
					App.Model.Events.add(resp.items[i]);
				}

				_this.renderCalendar();
			});
		},

		/* This prepares & formats the event data from model & adds page listeners (on first call) */
		renderCalendar: function(){
			var events = [], start, end, _this = this;
			App.Model.Events.each(function(model) {

				start = model.get('start').dateTime || model.get('start').date;
				end = model.get('start').dateTime || model.get('start').date;

				events.push({
					modelId: model.get('id'),
					title: model.get('summary') || 'Event created by ' + model.get('organizer').displayName,
					start: moment(start)._d,
					end: moment(end)._d
				});
			});

			if(App.Calendar){
				$(this.ui.calendar).fullCalendar('destroy');
			}else{
				/* first time loading the calendar lets init the events controller and attach needed listerns */
				App.Controller.Events = new App.Controller.Events();
				App.vent.on('show:jumpToDate', _.bind(this.jumpToDate, this));
				App.vent.on('event:create', _.bind(this.createNewEvent, this));
				App.vent.on('event:update', _.bind(this.updateEvent, this));
			}
			this.initializeCalendar(events);

		},

		/**
		  * @desc this is the initialization of calendar create listers, and rendering the fullcalendar
		  * @param object events - an array of event objects from the model
		*/
		initializeCalendar: function(events){
			App.Calendar = $(this.ui.calendar).fullCalendar({
				defaultDate: moment().format('YYYY-MM-DD'),
				editable: true,
				eventLimit: true, // allow "more" link when too many events
				events: events,
				eventClick: function(calEvent, jsEvent, view) {
					var model = App.Model.Events.findWhere({id:calEvent.modelId});
					App.vent.trigger('show:eventInfo', model);
					
				}
			});
		},

		/* Displays the modal window and accepts a date to move fullcalendar to */
		jumpToDate: function(){
			var modal = $('#jumpToDate'),
			    dataPicker = $('#datetimepicker');
			modal.modal('show').one('shown.bs.modal', function (e) {
				dataPicker.datetimepicker({format:'MM/DD/YYYY'});

				dataPicker.find('input').on('click', function(){
					$(this).siblings('.input-group-addon').click();
				});

				var modalForm = $(this);
				modalForm.find('.submit').on('click', function(e){
					var newDate = modalForm.find('input[type="text"]').val();

					if(newDate === ''){
						App.vent.trigger('error', 'Please select a date');
					}else{
						App.Calendar.fullCalendar( 'gotoDate', moment(newDate)._d);
						modal.modal('hide');
					}
				});
				modal.one('hide.bs.modal', function (e) {
					modalForm.find('.submit').unbind('click');
					dataPicker.find('input').unbind();
				});
			});
		},

		/**
		  * @desc creates new Google Calendar event
		  * @param object params - event params from form
		*/
		createNewEvent: function(params){
			if(!params || typeof params !== 'object'){
				console.warn('Tried to create an event without passing a valid params object!');
			}else{
				var _this = this,		
				    resource = {
					"summary": params.title,
					"location": params.location,
					"start": {
					        "dateTime": moment(params.start).format('YYYY-MM-DDTHH:MM:SS.SSSZ'),
					        //"timeZone": timeZone
					},
					"end": {
					        "dateTime": moment(params.end).format('YYYY-MM-DDTHH:MM:SS.SSSZ'),
					        //"timeZone": timeZone
					},
					"visibility": 'default'
				};

				if(App.googleLoggedIn){
					var request = gapi.client.calendar.events.insert({
						'calendarId': 'primary',
						'resource': resource
					});
					_this.processGoogleRequest(request, params.start);
				}else{
					App.Model.Events.add(resource);
					_this.renderCalendar();
					App.Calendar.fullCalendar( 'gotoDate', moment(params.start)._d);
				}
			}
		},

		/**
		  * @desc updates a Google Calendar event with new details
		  * @param object params - event params from form
		  * @param string eventId - the event's google ID
		*/
		updateEvent: function(params, eventId){
			if(!params || typeof params !== 'object' || !eventId){
				console.warn('Tried to updating an event without passing a valid params and/or eventID!');
			}else{
				var _this = this,
				    resource = {
					"summary": params.title,
					"location": params.location,
					"start": {
					        "dateTime": moment(params.start).format('YYYY-MM-DDTHH:MM:SS.SSSZ'),
					        //"timeZone": timeZone
					},
					"end": {
					        "dateTime": moment(params.end).format('YYYY-MM-DDTHH:MM:SS.SSSZ'),
					        //"timeZone": timeZone
					},
					"visibility": 'default'
				};

				if(App.googleLoggedIn){
					var request = gapi.client.calendar.events.update({
						'eventId': eventId,
						'calendarId': 'primary',
						'resource': resource
					});
					_this.processGoogleRequest(request, params.start);
				}else{
					var model = App.Model.Events.findWhere({id:eventId});
					model.set(resource);
					_this.renderCalendar();
					App.Calendar.fullCalendar( 'gotoDate', moment(params.start)._d);
				}
			} 
		},


		/**
		  * @desc processes insert/update Google requests
		  * @param object request - the rquest object created by Google API
		  * @param string date - pass the date for the calendar to switch to
		*/
		processGoogleRequest: function(request, date){
			var _this = this;
			if(!request || typeof request !== 'object'){
				console.warn('Tried processing a google request but request variable is not valid!');
			}else{
				request.execute(function(resp) {
					console.log(resp);
					if(resp.error){
						App.vent.trigger('error', resp.error.message);
					}else{
						_this.refreshCalendar();
						setTimeout(function(){
							App.Calendar.fullCalendar( 'gotoDate', moment(date)._d);
						}, 1000);
					}
				});
			}
		}
	});

	App.Controller.Calendar = calendar;
})(window.App);
