define([
  'underscore',
  'backbone',
  'handlebars',
  'collections/species_collection',
  'text!templates/species_list_tpl.handlebars'
], function(_, Backbone, Handlebars, SpeciesCollection, TPL) {

  'use strict';

  var SpeciesView = Backbone.View.extend({

    el: '#speciesView',

    template: Handlebars.compile(TPL),

    initialize: function() {
      this.collection = new SpeciesCollection();
      this.getData(2013); // Yellowstone ID
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
          this.render();
        }, this));
    }

  });

  return SpeciesView;

});
