define([
  'underscore',
  'backbone'
], function(_, Backbone) {

  'use strict';

  var TabsView = Backbone.View.extend({

    el: '#tabsView',

    initialize: function() {
      this.setListeners();
    },

    setListeners: function() {
      Backbone.Events.on('park:change', this.start, this);
    },

    start: function() {
      this.$el.removeClass('is-hidden');
    }

  });

  return TabsView;

});
