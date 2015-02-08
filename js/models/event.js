(function(App) {
    'use strict';

    var event = Backbone.Model.extend({
        events: {},

        idAttribute: 'id',

        initialize: function() {}
    });

    App.Model.Event = event;
})(window.App);
