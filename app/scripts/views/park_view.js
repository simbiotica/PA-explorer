define([
  'underscore',
  'backbone',
  'handlebars',
  'models/park_model',
  'text!templates/park_tpl.handlebars'
], function(_, Backbone, Handlebars, ParkModel, TPL) {

  'use strict';

  var ParkView = Backbone.View.extend({

    el: '#parkView',

    template: Handlebars.compile(TPL),

    initialize: function() {
      this.model = new ParkModel();
      this.setListeners();
    },

    render: function() {
      this.$el.html(this.template(this.data));
    },

    setListeners: function() {
      Backbone.Events.on('park:change', this.getData, this);
    },

    getData: function(parkId) {
      this.model.getByParkId(parkId)
        .done(_.bind(function(data) {
          this.data = data.toJSON();
          this.render();
          Backbone.Events.trigger('park:info', this.data);
        }, this));
    }

  });

  return ParkView;

});
