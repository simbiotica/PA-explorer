define([
  'underscore',
  'backbone'
], function(_, Backbone) {

  'use strict';

  var ToolbarView = Backbone.View.extend({

    el: '#toolbarView',

    events: {
      'change input': 'changeLayer'
    },

    changeLayer: function(e) {
      var $current = $(e.currentTarget);
      Backbone.Events.trigger('layer:change', {
        slug: $current.data('layer'),
        type: $current.data('type'),
        active: $current.prop('checked')
      });
      e.preventDefault();
    }

  });

  return ToolbarView;

});
