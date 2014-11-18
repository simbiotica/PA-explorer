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
      this.$el.html(this.template(this.data));
    },

    setBg: function() {
      var len = this.data.photos.length;
      var random = _.random(0, len-1);
      if (len > 0) {
        var photoName = this.data.photos[random].photo_file_url.split('medium/')[1];
        $('.l-bg').css('background-image', 'url(http://static.panoramio.com/photos/large/' + photoName + ')');
      }
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
          this.setBg();
        }, this));
    }

  });

  return PhotosView;

});
