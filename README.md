PA-explorer
===========
![](https://s3-eu-west-1.amazonaws.com/uploads-eu.hipchat.com/80556/1225844/nIdyD35Vqc640Lz/pa-species_02.png)
![](https://s3-eu-west-1.amazonaws.com/uploads-eu.hipchat.com/80556/1225844/R0vwSGwfHnCoF8N/pa-species_03.png)





You can explore all the data avible on a PA.

About the data: 


Species Information:    [eol.org](http://eol.org/info/api_overview)

Species on PAs:         [dopa-services](http://dopa-services.jrc.ec.europa.eu/services/help)

Weather map:            [http://openweathermap.org](http://openweathermap.org/api)

Forest disturbation, fires and loss: [Global Forest watch API](http://datalab.wri.org/using-the-gfw-api-update)

High resolution images: [DigitalGlobe](https://www.digitalglobe.com)

Images:                 [Panoramio](www.panoramio.com)

Floods Risk:            [UNEP](http://preview.grid.unep.ch/geoserver/wms)


## To develop

* Node 0.10+

Install globally dependencies:

    npm install -g grunt-cli bower phantomjs

### To install

    npm install

### To run

For development
    
    grunt server

For production
    
    grunt build

### Deploy to gh-pages

    grunt deploy
