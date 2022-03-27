var lat = 48.852969;
var lon = 2.349903;
var carte;

function addMarker(location) {
  // we are using MapQuest's Nominatim service
  let geocode = `https://nominatim.openstreetmap.org/search?q=<${location}>&format=jsonv2`;
  // use jQuery to call the API and get the JSON results
  $.getJSON(geocode, function (data) {
    // get lat + lon from first match
    let coord = [data[0].lat, data[0].lon];
    var marker = L.marker(coord).addTo(carte);
    marker.bindPopup(location);
  });
}

// Map initialization function
function initMap() {
  var locations = document.getElementsByClassName("locs");
  // Create the object "map" and insert it in the HTML element which has the ID "map"
  carte = L.map("map").setView([lat, lon], 2);
  markerGroup = L.markerClusterGroup();
  //Retreive the map
  L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
    minZoom: 1,
    maxZoom: 20,
  }).addTo(carte);

  for (let index = 0; index < locations.length; index++) {
    let loc = locations[index].textContent;
    addMarker(loc);
  }

  var southWest = L.latLng(-89.98155760646617, -180),
    northEast = L.latLng(89.99346179538875, 180);
  var bounds = L.latLngBounds(southWest, northEast);

  carte.setMaxBounds(bounds);
  carte.on("drag", function () {
    carte.panInsideBounds(bounds, { animate: false });
  });
}

// Initialization function which is executed when the page is loaded
window.onload = function () {
  initMap();
};
