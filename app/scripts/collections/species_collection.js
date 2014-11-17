define([
  'jquery',
  'underscore',
  'underscoreString',
  'backbone',
  'moment'
], function($, _, underscoreString, Backbone, moment) {

  'use strict';

  var SpeciesCollection = Backbone.Collection.extend({

    status: {
      'CR': 'Critically Endangered',
      'EN': 'Endangered',
      'VU': 'Vulnerable',
      'NT': 'Near Threatened',
      'LC': 'Least Concern',
      'EX': 'Extinct',
      'EW': 'Extinct in the Wild',
      'DD': 'Data Deficient'
    },

    presence: {
      '0': 'Unknown',
      '1': 'Extant',
      '2': 'Probably Extant',
      '3': 'Possibly Extant',
      '4': 'Possibly Extinct',
      '5': 'Extinct (post 1500)',
      '6': 'Presence Uncertain'
    },

    url: function() {
      return _.str.sprintf('http://dopa-services.jrc.ec.europa.eu/services/especies/get_pa_species_list_validated?wdpa_id=%s', this.currentParkId);
    },

    parse: function(data) {
      // 0-Unknown, 1-Extant, 2-Probably Extant, 3-Possibly Extant, 4-Possibly Extinct, 5-Extinct (post 1500), 6-Presence Uncertain
      return _.map(data.records, function(d) {
        d.statusName = this.status[d.status];
        d.presence = this.presence[d.min_presence_id];
        d.validatedName = d.validated ? 'Yes' : 'No';
        d.assessedParsed = moment(d.assessed).format('YYYY-MM-DD');
        return d;
      }, this);
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

  return SpeciesCollection;

});
