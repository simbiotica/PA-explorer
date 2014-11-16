define([
  'underscore',
  'underscoreString',
  'backbone'
], function(_, underscoreString, Backbone) {

  'use strict';

  var ParkModel = Backbone.Model.extend({

    url: function() {
      return _.str.sprintf('http://dopa-services.jrc.ec.europa.eu/services/especies/get_pa_info?wdpa_id=%s', this.currentParkId);
    },

    parse: function(data) {
      return data.records[0];
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

  return ParkModel;

});
