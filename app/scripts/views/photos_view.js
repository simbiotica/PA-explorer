define([
  'underscore',
  'backbone',
  'handlebars',
  'collections/photos_collection',
  'text!templates/photos_tpl.handlebars'
], function(_, Backbone, Handlebars, PhotosCollection, TPL) {

  'use strict';

  var PhotosView = Backbone.View.extend({

    el: '#photosView',

    template: Handlebars.compile(TPL),

    initialize: function() {
      this.collection = new PhotosCollection();
      this.setListeners();
    },

    render: function() {
      console.log(this.data);
      this.$el.html(this.template(this.data));
    },

    setListeners: function() {
      Backbone.Events.on('park:bounds', this.getData, this);
    },

    getData: function(bounds) {
      this.collection.getByBounds(bounds)
        .done(_.bind(function(data) {
          this.data = {
            photos: data.toJSON()
          };
          this.render();
        }, this));
    }

  });

  return PhotosView;

});
