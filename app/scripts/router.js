define([
  'backbone'
], function(Backbone) {

  'use strict';

  var Router = Backbone.Router.extend({

    routes: {
      '': 'removeParks',
      ':park': 'showByPark'
    },

    removeParks: function() {
       Backbone.Events.trigger('park:hidden');
    },

    showByPark: function(parkId) {
      Backbone.Events.trigger('park:change', parkId);
    }

  });

  return Router;

});
