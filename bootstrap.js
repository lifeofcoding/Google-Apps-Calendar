(function(App) {
	'use strict';
	$(document).on('ready', function() {
		App.start();
		App.isReady = true;
		App.vent.trigger('onReady');
	});
})(window.App);
