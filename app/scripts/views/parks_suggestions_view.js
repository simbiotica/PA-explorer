define([
  'underscore',
  'underscoreString',
  'backbone',
  'handlebars',
  'collections/parks_collection',
  'text!templates/parks_suggestions_tpl.handlebars'
], function(_, underscoreString, Backbone, Handlebars, ParksCollection, TPL) {

  'use strict';

  var ParksSuggestionView = Backbone.View.extend({

    el: '#parksSuggestionView',

    events: {
      'submit form': 'changePark'
    },

    template: Handlebars.compile(TPL),

    initialize: function() {
      this.collection = new ParksCollection();
      this.getData();
    },

    render: function() {
      this.$el.html(this.template(this.data));
    },

    getData: function(parkId) {
      this.collection.getByParkId(parkId)
        .done(_.bind(function(collection) {
          this.data = {
            parks: collection.toJSON()
          };
          this.render();
        }, this));
    },

    changePark: function(e) {
      var value = $(e.currentTarget).find('input').val();
      var id = this.$el.find(_.str.sprintf('option[value="%s"]', value)).data('id');
      window.location.hash = id;
      e.preventDefault();
    }

  });

  return ParksSuggestionView;

});
