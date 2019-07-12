import Controller from './components/controller.class';
import mapboxgl from 'mapbox-gl';

(function start() {
  const person = require('./img/man.png');
  const controller = new Controller(document.querySelector('.content-section'));

  controller.map.map.on('mousemove', function (e, parent = this) {
    let features = this.queryRenderedFeatures(e.point, {
      layers: ['council-fill']
    });
    if (features.length) {
      //console.log(features[0]);
      this.setFilter('council-hover', ['==', 'districts', features[0].properties.districts]);
    }else{
      features = this.queryRenderedFeatures(e.point, {
        layers: ['schools']
      });
      if(!features.length){
        features = this.queryRenderedFeatures(e.point, {
          layers: ['libraries']
        });
        if(!features.length){
          features = this.queryRenderedFeatures(e.point, {
            layers: ['parks']
          });
          if (!features.length) {
            features = this.queryRenderedFeatures(e.point, {
              layers: ['neighborhood-fill']
            });
            if (features.length) {
            this.setFilter('neighborhood-hover', ['==', 'OBJECTID', features[0].properties.OBJECTID]);
            }
          }
        }
      }
    }
    this.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
  });
  controller.map.map.on('mouseleave', 'council-fill', function () {
    this.setFilter('council-hover', ['==', 'districts', '']);
  });
  controller.map.map.on('mouseleave', 'neighborhood-fill', function () {
    this.setFilter('neighborhood-hover', ['==', 'OBJECTID', '']);
  });
  controller.map.map.on('click', function (e, parent = this) {
    let features = this.queryRenderedFeatures(e.point, {
      layers: ['council-fill']
    });
    ////console.log(e);
    if (features.length) {
      this.setFilter('council-featured', ['==', 'districts', '']);
      controller.map.map.flyTo({
        center: [e.lngLat.lng, e.lngLat.lat],
        zoom: 13,
        speed: .75,
        curve: 1,
        easing(t) {
          return t;
        }
      });
      document.querySelector('.data-panel').className = 'data-panel active';
      controller.updatePanel(features[0], controller);
    } else {
      features = this.queryRenderedFeatures(e.point, {
        layers: ['schools']
      });
      if (features.length) {
        // console.log(features[0]);
        // controller.updatePanel(features[0], controller);
        new mapboxgl.Popup()
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .setHTML(features[0].properties.School_Nam)
        .addTo(controller.map.map);
      } else {
        features = this.queryRenderedFeatures(e.point, {
          layers: ['libraries']
        });
        if (features.length) {
          // console.log(features[0]);
          // controller.updatePanel(features[0], controller);
          new mapboxgl.Popup()
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .setHTML(features[0].properties.name)
          .addTo(controller.map.map);
        } else {
          features = this.queryRenderedFeatures(e.point, {
            layers: ['parks']
          });
          if (features.length) {
          // console.log(features[0]);
          new mapboxgl.Popup()
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .setHTML(`${features[0].properties.name} Park`)
          .addTo(controller.map.map);
          } else {
            features = this.queryRenderedFeatures(e.point, {
              layers: ['neighborhood-fill']
            });
            // console.log(features[0]);
            let tempURL = features[0].properties.name;
            tempURL = tempURL.replace(/\//g,'-');
            tempURL = tempURL.replace(/\s+/g, '-');
            // console.log(tempURL);
            switch (tempURL) {
              case 'Southwest':
                window.location.href = encodeURI('https://theneighborhoods.org/neighborhoods/southwest-detroit');
                break;
              case 'Schaefer-7-8-Lodge':
                window.location.href = encodeURI('https://theneighborhoods.org/neighborhoods/schaefer-78-lodge');
                break;
              case 'Penrose':
                window.location.href = encodeURI('https://theneighborhoods.org/neighborhoods/penrose-village');
                break;
              case 'Grandmont-#1':
                window.location.href = encodeURI('https://theneighborhoods.org/neighborhoods/grandmont-1');
                break;
              case 'Brewster-Douglas':
                window.location.href = encodeURI('https://theneighborhoods.org/neighborhoods/brewster-douglass');
                break;
              case 'Campau-Banglatown':
                window.location.href = encodeURI('https://theneighborhoods.org/neighborhoods/campaubanglatown');
                break;
              case 'Gratiot-Town-Ketterring':
                window.location.href = encodeURI('https://theneighborhoods.org/neighborhoods/gratiot-town-kettering');
                break;
              case "O'Hair-Park":
                window.location.href = encodeURI('https://theneighborhoods.org/neighborhoods/ohair-park');
                break;
              case "Evergreen-Lahser-7-8":
                window.location.href = encodeURI('https://theneighborhoods.org/neighborhoods/evergreen-lahser-78');
                break;
              default:
                window.location.href = encodeURI('https://theneighborhoods.org/neighborhoods/' + tempURL);
            }
          }
        }
      }
    }
  });
  // controller.map.geocoder.on('result', function (ev) {
  //   //console.log(ev);
  //   if(controller.geocoderOff){
  //     controller.geocoderOff = false;
  //     controller.geoResults(ev, controller);
  //   }else{
  //     //console.log('extra call');
  //   }
  // });
  controller.map.map.loadImage(person, function(error, image) {
    if (error) throw error;
    controller.map.map.addImage('person', image);
    controller.map.map.addLayer({
        "id": "point",
        "type": "symbol",
        "source": 'single-point',
        "layout": {
            "icon-image": "person",
            "icon-size": .6
        }
    });
  });
  document.getElementById('close-panel-btn').addEventListener('click', function () {
    controller.panel.clearPanel();
    document.querySelector('.data-panel.active').className = 'data-panel';
  });
})(window);
