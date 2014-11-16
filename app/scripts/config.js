require.config({

  baseUrl: 'scripts',

  paths: {
    backbone: '../../bower_components/backbone/backbone',
    underscore: '../../bower_components/underscore/underscore',
    underscoreString: '../../bower_components/underscore.string/lib/underscore.string',
    jquery: '../../bower_components/jquery/dist/jquery',
    foundation: '../../bower_components/foundation/js/foundation',
    handlebars: '../../bower_components/handlebars/handlebars',
    moment: '../../bower_components/moment/moment',
    text: '../../bower_components/text/text'
  },

  shim: {
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    underscore: {
      exports: '_'
    },
    underscoreString: {
      deps: ['underscore'],
      exports: '_.str'
    },
    jquery: {
      exports: '$'
    },
    foundation: {
      deps: ['jquery'],
      exports: '$'
    },
    handlebars: {
      exports: 'Handlebars'
    }
  }

});
