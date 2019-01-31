import Controller from './components/controller.class';

(function start() {
  
  const controller = new Controller(document.querySelector('.content-section'));

  controller.map.map.on('mousemove', function (e, parent = this) {
    let features = this.queryRenderedFeatures(e.point, {
      layers: ['council-fill']
    });
    if (features.length) {
      console.log(features[0]);
      this.setFilter('council-hover', ['==', 'districts', features[0].properties.districts]);
    }else{
      features = this.queryRenderedFeatures(e.point, {
        layers: ['neighborhood-fill']
      });
      if (features.length) {
        console.log(features[0]);
        this.setFilter('neighborhood-hover', ['==', 'OBJECTID', features[0].properties.OBJECTID]);
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
    console.log(e);
    if (features.length) {
      controller.map.map.flyTo({
        center: [e.lngLat.lng, e.lngLat.lat],
        zoom: 13,
        speed: .5,
        curve: 1,
        easing(t) {
          return t;
        }
      });
      controller.updatePanel(features[0], controller);
    } else {
      features = this.queryRenderedFeatures(e.point, {
        layers: ['neighborhood-fill']
      });
      if (features.length) {
        controller.updatePanel(features[0], controller);
      } else {
      
      }
    }
    document.querySelector('.data-panel').className = 'data-panel active';
  });
  controller.map.geocoder.on('result', function (ev) {
    console.log(ev);
    if(controller.geocoderOff){
      controller.geocoderOff = false;
      controller.geoResults(ev, controller);
    }else{
      console.log('extra call');
    }
  });

  document.getElementById('close-panel-btn').addEventListener('click', function () {
    controller.panel.clearPanel();
    document.querySelector('.data-panel.active').className = 'data-panel';
  });
})(window);
