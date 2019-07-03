'use strict';
import Map from './map.class.js';
import Panel from './panel.class.js';
export default class Controller {
  constructor(container) {
    this.geocoderOff = false;
    this.scoutVolunteers = null;
    this.map = new Map({
      styleURL: 'mapbox://styles/mapbox',
      mapContainer: 'map',
      geocoder: false,
      baseLayers: {
        street: 'streets-v10',
        satellite: 'cj774gftq3bwr2so2y6nqzvz4'
      },
      center: [-83.10, 42.36],
      zoom: 11,
      boundaries: {
        sw: [-83.3437,42.2102],
        ne: [-82.8754,42.5197]
      },
      sources: [
        {
          id: "neighborhood",
          type: "geojson",
          data: 'https://services2.arcgis.com/qvkbeam7Wirps6zC/ArcGIS/rest/services/theNeighborhoods/FeatureServer/5/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=2898&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson'
        },
        {
          id: "neighborhood-labels",
          type: "geojson",
          data: 'https://services2.arcgis.com/qvkbeam7Wirps6zC/ArcGIS/rest/services/theNeighborhoods/FeatureServer/2/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=2898&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson'
        },
        {
          id: "council",
          type: "geojson",
          data: 'https://services2.arcgis.com/qvkbeam7Wirps6zC/ArcGIS/rest/services/theNeighborhoods/FeatureServer/7/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson'
        },
        {
          id: "council-labels",
          type: "geojson",
          data: 'https://services2.arcgis.com/qvkbeam7Wirps6zC/ArcGIS/rest/services/theNeighborhoods/FeatureServer/3/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson'
        },
        {
          id: "parks",
          type: "geojson",
          data: 'https://services2.arcgis.com/qvkbeam7Wirps6zC/ArcGIS/rest/services/theNeighborhoods/FeatureServer/6/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=5&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson'
        },
        {
          id: "schools",
          type: "geojson",
          data: 'https://services2.arcgis.com/qvkbeam7Wirps6zC/ArcGIS/rest/services/theNeighborhoods/FeatureServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson'
        },
        {
          id: "libraries",
          type: "geojson",
          data: 'https://services2.arcgis.com/qvkbeam7Wirps6zC/ArcGIS/rest/services/theNeighborhoods/FeatureServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson'
        },
        {
          id: "historic",
          type: "geojson",
          data: 'https://services2.arcgis.com/qvkbeam7Wirps6zC/ArcGIS/rest/services/Detroit_Local_Historic_Districts/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=geojson&token='
        },
        {
          id: "single-point",
          type: "geojson",
          data: {
              "type": "FeatureCollection",
              "features": []
          }
        }
      ],
      layers: [
        {
          "id": "council-fill",
          "type": "fill",
          "source": "council",
          "layout": {},
          "maxzoom": 12,
          "paint": {
            "fill-color": '#9FD5B3',
            "fill-opacity": 0
          }
        },
        {
          "id": "council-borders",
          "type": "line",
          "source": "council",
          "layout": {},
          "maxzoom": 12,
          "paint": {
            "line-color": "#004544",
            "line-width": 3
          }
        },
        {
          "id": "council-hover",
          "type": "fill",
          "source": "council",
          "layout": {},
          "maxzoom": 12,
          "paint": {
            "fill-color": '#004544',
            "fill-opacity": .5
          },
          "filter": ["==", "OBJECTID", ""]
        },
        {
          "id": "council-featured",
          "type": "fill",
          "source": "council",
          "layout": {},
          "maxzoom": 12,
          "paint": {
            "fill-color": '#004544',
            "fill-opacity": .5
          },
          "filter": ["==", "OBJECTID", ""]
        },
        {
          'id': 'council-labels',
          'type': 'symbol',
          'source': 'council-labels', 
          "maxzoom": 12,
          'layout': {
            "text-font": ["Mark SC Offc Pro Bold"],
            "text-field": "District {districts}",
            "symbol-placement": "point",
            "text-size": 22
          },
          'paint': {
            'text-color': '#004544'
          }
        },
        {
          "id": "historic",
          "type": "fill",
          "source": "historic",
          "minzoom": 12,
          "layout": {},
          "paint": {
            "fill-color": "#d11141",
            "fill-opacity": .6
          }
        },
        {
          "id": "neighborhood-fill",
          "type": "fill",
          "source": "neighborhood",
          "layout": {},
          "minzoom": 12,
          "paint": {
            "fill-color": '#9FD5B3',
            "fill-opacity": 0
          }
        },
        {
          "id": "neighborhood-borders",
          "type": "line",
          "source": "neighborhood",
          "layout": {},
          "minzoom": 12,
          "paint": {
            "line-color": "#004544",
            "line-width": 3
          }
        },
        {
          "id": "neighborhood-hover",
          "type": "fill",
          "source": "neighborhood",
          "layout": {},
          "minzoom": 12,
          "paint": {
            "fill-color": '#004544',
            "fill-opacity": .5
          },
          "filter": ["==", "OBJECTID", ""]
        },
        {
          'id': 'neighborhood-labels',
          'type': 'symbol',
          'source': 'neighborhood-labels', 
          "minzoom": 12,
          'layout': {
            "text-font": ["Mark SC Offc Pro Bold"],
            "text-field": "{name}",
            "symbol-placement": "point",
            "text-size": 22
          },
          'paint': {
            'text-color': '#004544'
          }
        },
        {
          'id': 'parks',
          'type': 'fill',
          'source': 'parks',
          'minzoom': 12,
          "layout": {},
          "paint": {
            "fill-color": "#00b159",
            "fill-opacity": 1
          }
        },
        {
          "id": "schools",
          "source": "schools",
          "type": "circle",
          "minzoom": 12,
          "paint": {
              "circle-radius": 8,
              "circle-color": "#00aedb"
          }
        },
        {
          "id": "libraries",
          "source": "libraries",
          "type": "circle",
          "minzoom": 12,
          "paint": {
              "circle-radius": 8,
              "circle-color": "#eb6841"
          }
        }
      ]
    });
    this.panel = new Panel(container);
  }
  
  initialForm(ev,controller){
    switch (ev) {
      case 'v-sign-up':
        document.querySelector('#user-type-section').className = 'hidden';
        document.querySelector('main').className = '';
        break;
      default:

    }
  }

  updatePanel(ev, controller){
    ////console.log(ev);
    ////console.log(this.panel);
    this.panel.buildPanel(ev);
  }

  // geoResults(ev, controller){
  //   controller.map.geocoder.setInput('');
  //   controller.map.map.getSource('single-point').setData(ev.result.geometry);
  //   controller.map.map.flyTo({
  //     center: ev.result.center,
  //     zoom: 15,
  //     speed: 1,
  //     curve: 1,
  //     easing(t) {
  //       return t;
  //     }
  //   });
  //   const url = `https://services2.arcgis.com/qvkbeam7Wirps6zC/ArcGIS/rest/services/Detroit_Local_Historic_Districts/FeatureServer/0/query?where=&text=&objectIds=&time=&geometry=${ev.result.center[0]}%2C+${ev.result.center[1]}&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=fid%2C+name&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json`;
  //   fetch(url)
  //   .then((resp) => resp.json())
  //   .then(function (data) {
  //     //console.log(data);
  //     if (data.features.length) {
  //       const patrol = data.features[0].properties.name.split(' ').join('+');
  //       document.getElementById('sheet-link').href = `https://app.smartsheet.com/b/form/f004f42fcd4345b89a35049a29ff408a?Patrol+ID=${data.features[0].properties.FID}&Patrol+Name=${patrol}`;
  //       document.querySelector('.patrol-info').innerHTML = `<h3>Radio Patrol ${data.features[0].properties.name}</h3><p>Interested in becoming part of your local radio patrol? Follow the link to start the process.</p><p><small>The Radio Patrol application process is managed by the Detroit Police Department. Once you complete the sign up, someone will contact you regarding the application process. Residents who complete the online form will be contacted after October 31 to start the application process.</small></p>`;
  //       document.querySelector('.data-panel').className = 'data-panel active';
  //       controller.geocoderOff = true;
  //     } else {
  //       const patrol = 'NEED+NAME';
  //       document.getElementById('sheet-link').href = `https://app.smartsheet.com/b/form/0c25bae787bc40ef9707c95b2d9684e8`;
  //       document.querySelector('.patrol-info').innerHTML = `<h3>NO RADIO PATROL FOUND</h3><p>Interested starting your new local radio patrlo? Follow the link to start the process.</p><p><small>The Radio Patrol application process is managed by the Detroit Police Department. Once you complete the sign up, someone will contact you regarding the application process. Residents who complete the online form will be contacted after October 31 to start the application process.</small></p>`;
  //       document.querySelector('.data-panel').className = 'data-panel active';
  //       controller.geocoderOff = true;
  //     }
  //   });
  // }
}
