define([
  'jquery',
  'underscore',
  'underscoreString',
  'backbone'
], function($, _, underscoreString, Backbone) {

  'use strict';

  var ParksCollection = Backbone.Collection.extend({

    url: 'https://wri-01.cartodb.com/api/v2/sql?q=SELECT%20name,iso3,wdpaid%20FROM%20protected_areas%20where%20desig_eng=%27World%20Heritage%20Site%27%20and%20marine=%270%27%20order%20by%20name%20asc',

    parse: function(data) {
      return data.rows;
    },

    getByParkId: function(parkId) {
      var deferred = new $.Deferred();
      this.currentParkId = parkId;
      this.fetch({
        success: deferred.resolve,
        error: function(err) {
          throw err.textStatus;
        }
      });
      return deferred.promise();
    }

  });

  return ParksCollection;

});
