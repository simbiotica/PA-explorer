define([
  'jquery',
  'underscore',
  'underscoreString',
  'backbone'
], function($, _, underscoreString, Backbone) {

  'use strict';

  var SpeciesCollection = Backbone.Collection.extend({

    url: function() {
      return _.str.sprintf('http://dopa-services.jrc.ec.europa.eu/services/especies/get_pa_species_list_validated?wdpa_id=%s', this.currentParkId);
    },

    parse: function(data) {
      return data.records;
    },

    getByParkId: function(parkId) {
      var deferred = new $.Deferred();
      this.currentParkId = parkId;
      this.fetch({
        url: this.url(),
        success: deferred.resolve,
        error: function(err) {
          throw err.textStatus;
        }
      });
      return deferred.promise();
    }

  });

  return SpeciesCollection;

});
