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
      'submit form': 'changePark',
      'keyup input': 'onSelectPark'
    },

    template: Handlebars.compile(TPL),

    initialize: function() {
      this.collection = new ParksCollection();
      this.setListeners();
      this.getData();
    },

    render: function() {
      this.$el.html(this.template(this.data));
    },

    setListeners: function() {
      Backbone.Events.on('park:info', this.setValue, this);
    },

    onSelectPark: function(e) {
      if (e.keyCode === 13) {
        var value = $(e.currentTarget).val();
        var id = this.$el.find(_.str.sprintf('option[value="%s"]', value)).data('id');
        window.location.hash = id;
        e.preventDefault();
      }
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
    },

    setValue: function(parkData) {
      this.$el.find('input[type="text"]').val(parkData.name);
    }

  });

  return ParksSuggestionView;

});
