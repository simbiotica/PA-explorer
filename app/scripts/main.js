require([
  'jquery',
  'foundation',
  'backbone',
  'router',
  'views/toolbar_view',
  'views/park_view',
  'views/photos_view',
  'views/parks_suggestions_view',
  'views/map_view',
  'views/species_view'
], function($, foundation, Backbone, Router, ToolbarView, ParkView, PhotosView, ParksSuggestionsView, MapView, SpeciesView) {

  'use strict';

  // Foundation
  $(document).foundation();

  // Application initialization
  new ToolbarView();
  new ParksSuggestionsView();
  new ParkView();
  new MapView();
  new SpeciesView();
  new PhotosView();

  new Router();

  Backbone.history.start({
    pushState: false
  });

});
