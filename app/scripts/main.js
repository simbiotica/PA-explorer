require([
  'jquery',
  'foundation',
  'views/species_view'
], function($, foundation, SpeciesView) {

  'use strict';

  $(document).foundation();

  new SpeciesView();

});
