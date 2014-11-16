define([
  'underscore',
  'underscoreString',
  'backbone',
  'models/bbox_model',
  'text!queries/bounds.psql'
], function(_, underscoreString, Backbone, BboxModel, BoundsSQL) {

  'use strict';

  var MapView = Backbone.View.extend({

    el: '#mapView',

    options: {
      cartodb: {
        user: 'simbiotica'
      }
    },

    basemap: {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    },

    layers: {
      tiles: {
        weather: {
          url: 'http://{s}.tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png',
          attribution: 'Open Weather Map'
        }
      },
      wms: {
        digitalglobe: {
          url: 'https://services.digitalglobe.com/mapservice/wmsaccess',
          options: {
            layers: 'DigitalGlobe:Imagery',
            CONNECTID: '1c800d25-9c83-43a9-af2f-4d6dfc816d0f',
            format: 'image/png',
            transparent: true,
            attribution: 'Digital Globe'
          }
        },
        landslides: {
          url: 'http://preview.grid.unep.ch/geoserver/wms',
          options: {
            layers: 'preview:ls_pr',
            CONNECTID: '1c800d25-9c83-43a9-af2f-4d6dfc816d0f',
            format: 'image/png',
            transparent: true,
            attribution: 'UNEP'
          }
        },
        floods: {
          url: 'http://preview.grid.unep.ch/geoserver/wms',
          options: {
            layers: 'preview:fl_frequency',
            CONNECTID: '1c800d25-9c83-43a9-af2f-4d6dfc816d0f',
            format: 'image/png',
            transparent: true,
            attribution: 'UNEP'
          }
        },
        flood_risk: {
          url: 'http://preview.grid.unep.ch/geoserver/wms',
          options: {
            layers: 'preview:fl_risk',
            CONNECTID: '1c800d25-9c83-43a9-af2f-4d6dfc816d0f',
            format: 'image/png',
            transparent: true,
            attribution: 'UNEP'
          }
        }
      },
      cartodb: {
        fires: {
          'user_name': 'wri-01',
          type: 'cartodb',
          sublayers: [{
            sql: 'select * from global_7d',
            cartocss: '#global_7d {marker-fill: #FFCC00; marker-width: 3; marker-line-color: #FFF; marker-line-width: 1.5; marker-line-opacity: 1; marker-opacity: 0.9; marker-comp-op: multiply; marker-type: ellipse; marker-placement: point; marker-allow-overlap: true; marker-clip: false; marker-multi-policy: largest; } #global_7d[zoom>6]{ marker-width: 6;} #global_7d[zoom>11]{ marker-width: 13; } #global_7d[zoom>12]{ marker-width: 25; } #global_7d[zoom>13]{ marker-width: 50; } #global_7d[zoom>14]{ marker-width: 100; } #global_7d[zoom>15]{ marker-width: 200; } #global_7d[zoom>16]{ marker-width: 400; } #global_7d[zoom>17]{ marker-width: 800;}'
          }]
        },
        'protected_areas': {
          'user_name': 'wri-01',
          type: 'cartodb',
          sublayers: [{
            sql: 'select * from protected_areas',
            cartocss: '#protected_areas{polygon-fill: #2167AB; polygon-opacity: 0; line-color: #2167AB; line-width: 1; line-opacity: 1;}'
          }]
        }
      }
    },

    initialize: function() {
      this._layers = {};
      this.sql = new cartodb.SQL(this.options.cartodb);
      this.model = new BboxModel();
      this.createMap();
      this.setBasemap();
      this.setListeners();
    },

    createMap: function() {
      this.map = L.map(this.el, {
        center: [0, 0],
        zoom: 4
      });
    },

    setListeners: function() {
      Backbone.Events.on('park:change', this.fitBounds, this);
      Backbone.Events.on('layer:change', this.setLayer, this);
    },

    setBasemap: function() {
      L.tileLayer(this.basemap.url).addTo(this.map);
    },

    setLayer: function(layerInfo) {
      if (!layerInfo.active) {
        return this.removeLayer(layerInfo.slug);
      }
      if (layerInfo.type === 'cartodb') {
        this.setCartoDBLayer(layerInfo.slug);
      } else if (layerInfo.type === 'wms') {
        this.setWMSTile(layerInfo.slug);
      } else if (layerInfo.type === 'tile') {
        this.setTile(layerInfo.slug);
      }
    },

    setTile: function(layerSlug) {
      this._layers[layerSlug] = L.tileLayer(this.layers.tiles[layerSlug].url).addTo(this.map);
    },

    setWMSTile: function(layerSlug) {
      this._layers[layerSlug] = L.tileLayer.wms(this.layers.wms[layerSlug].url, this.layers.wms[layerSlug].options).addTo(this.map);
    },

    setCartoDBLayer: function(layerSlug) {
      this._layers[layerSlug] = cartodb.createLayer(this.map, this.layers.cartodb[layerSlug]).addTo(this.map);
    },

    removeLayer: function(layerSlug) {
      if (this._layers[layerSlug]) {
        this.map.removeLayer(this._layers[layerSlug]);
      }
    },

    fitBounds: function(parkId) {
      var query, geojsonLayer;
      this.model.getByParkId(parkId)
        .done(_.bind(function(parkData) {
          query = _.str.sprintf(BoundsSQL, parkData.toJSON().get_pa_bbox);
          this.sql.execute(query)
            .done(_.bind(function(boundsGeoJSONData) {
              geojsonLayer = L.geoJson(JSON.parse(boundsGeoJSONData.rows[0].bounds));
              this.map.fitBounds(geojsonLayer.getBounds());
            }, this));
        }, this));
    }

  });

  return MapView;

});
