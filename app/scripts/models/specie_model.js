define([
  'underscore',
  'underscoreString',
  'backbone'
], function(_, underscoreString, Backbone) {

  'use strict';

  var SpecieModel = Backbone.Model.extend({

    url: function() {
      return _.str.sprintf('http://eol.org/api/pages/1.0/%s.json', this.currentSpecieId);
    },

    getById: function(specieId) {
      var deferred = new $.Deferred();
      this.currentSpecieId = specieId;
      this.fetch({
        dataType: 'jsonp',
        data: {
          images: 2,
          licenses: 'all',
          details: 'true',
          key: '1051166820dcea062843748c4e4d04ac92f67358'
        },
        success: deferred.resolve,
        error: function(err) {
          throw err.textStatus;
        }
      });
      return deferred.promise();
    }

  });

  return SpecieModel;

});
