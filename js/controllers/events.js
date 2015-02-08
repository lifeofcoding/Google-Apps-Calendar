(function(App) {
	'use strict';
	var events = Marionette.Controller.extend({

		/**
		  * @desc Called when controller instance is created - this will attack needed listeners
		  * @param object options - passed this controllers other methods automatically via marionettejs
		*/
		initialize: function(options) {
			App.vent.on('show:newEvent', _.bind(this.newEvent, this));
			App.vent.on('show:eventInfo', _.bind(this.eventInfo, this));
		},

		/**
		  * @desc Called when user clicks on an event on calendar, Passes off to showModal to display edit model & handles submittion
		  * @param object model - passed the model data for the calendar event the user clicked on
		*/
		eventInfo: function(model){
			this.showModal($('#eventInfo'), model);
		},

		/* Passes off to showModal to Display new event modal and handles submittion */
		newEvent: function(){
			this.showModal($('#createEvent'));
		},

		showModal: function(element, model){
			var _this = this,
			    templateFunc = _.template($('#form-tpl').html()),
			    modelTemplate, modalForm;
			element.modal('show').one('shown.bs.modal', function (e) {
				modelTemplate = model ? templateFunc(model) : templateFunc();
				$(this).find('.modal-body').html(modelTemplate);
				
				_this.initializeDatePickers();

				modalForm = $(this);
				modalForm.find('.submit').on('click', function(e){
					var params = modalForm.find('form').serializeArray(),
					    newEvent = {}, hasEmptyValue = 0;
					_.each(params, function(data){
						if(data.value == null || data.value == ''){
							++hasEmptyValue;
						}
						newEvent[data.name] = data.value;
					});

					if(!hasEmptyValue){
						if(model){
							App.vent.trigger('event:update', newEvent, model.get('id'));
						}else{
							App.vent.trigger('event:create', newEvent);
						}
						element.modal('hide');
					}else{
						App.vent.trigger('error', 'Please fill out all fields');
					}
				});
				element.one('hide.bs.modal', function (e) {
					_this.unbindDatePickers();
					$(this).find('.modal-body').empty();
					modalForm.find('.submit').unbind('click');
				});
			});
		},

		initializeDatePickers: function(){
			$('#datetimepickerStart, #datetimepickerEnd').datetimepicker();

			$('#datetimepickerStart input, #datetimepickerEnd input').on('click', function(){
				$(this).parents('div').children('.input-group-addon').click();
			});
		},

		/* Helper function to remove listers to auto open datepicker when text input is clicked on */
		unbindDatePickers: function(){
			$('#datetimepickerStart input, #datetimepickerEnd input').unbind();
		}

	});
	App.Controller.Events = events;
})(window.App);
