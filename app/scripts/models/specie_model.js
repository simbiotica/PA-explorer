define([
  'underscore',
  'underscoreString',
  'backbone'
], function(_, underscoreString, Backbone) {

  'use strict';

  var SpecieModel = Backbone.Model.extend({

    url: function() {
      return _.str.sprintf('http://eol.org/api/pages/1.0/%s.json?images=1&licenses=pd', this.currentSpecieId);
    },

    getById: function(specieId) {
      var deferred = new $.Deferred();
      this.currentSpecieId = specieId;
      this.fetch({
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
