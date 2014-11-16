define([
  'backbone'
], function(Backbone) {

  'use strict';

  var Router = Backbone.Router.extend({

    routes: {
      ':park': 'showByPark'
    },

    showByPark: function(parkId) {
      Backbone.Events.trigger('park:change', parkId);
    }

  });

  return Router;

});
