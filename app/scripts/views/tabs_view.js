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
      Backbone.Events.on('park:hidden', this.hide, this);
      Backbone.Events.on('park:change', this.show, this);
    },

    show: function() {
      this.$el.removeClass('is-hidden');
    },

    hide: function() {
      this.$el.addClass('is-hidden');
    }

  });

  return TabsView;

});
