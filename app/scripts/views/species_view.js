define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'models/specie_model',
  'collections/species_collection',
  'text!templates/species_list_tpl.handlebars'
], function($, _, Backbone, Handlebars, SpecieModel, SpeciesCollection, TPL) {

  'use strict';

  var SpeciesView = Backbone.View.extend({

    el: '#speciesView',

    template: Handlebars.compile(TPL),

    initialize: function() {
      this.model = new SpecieModel();
      this.collection = new SpeciesCollection();
      this.setListeners();
    },

    setListeners: function() {
      Backbone.Events.on('park:change', this.getData, this);
    },

    render: function() {
      this.$el.html(this.template(this.data));
    },

    getData: function(parkId) {
      this.collection.getByParkId(parkId)
        .done(_.bind(function(collection) {
          this.data = {
            species: collection.toJSON()
          };
          this.getImages()
            .done(_.bind(function() {
              console.log(this.data);
              this.render();
            }, this));
        }, this));
    },

    getImages: function() {
      var deferred = new $.Deferred();
      var len = this.data.species.length;
      _.each(this.data.species, function(specie, index) {
        this.model.getById(specie.iucn_species_id)
          .done(_.bind(function(data) {
            var medias = data.toJSON().dataObjects;
            specie.media = medias.length > 0 ? _.findWhere(medias, {mimeType: 'image/jpeg'}) : null;
            if (len -1 === index) {
              deferred.resolve();
            }
          }, this));
      }, this);
      return deferred.promise();
    }

  });

  return SpeciesView;

});
