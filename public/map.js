var map;

function initializeMap() {
  var latlng = new google.maps.LatLng(42.830022, 74.587883);
  var myOptions = {
    zoom: 13,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  return map;
}

function placeMarker(location) {
  return new google.maps.Marker({
    position: location,
    draggable: true,
    map: map
  });
}

var polygon = null;

function drawPolygon(vertices) {
  if (polygon) {
    polygon.setMap(null);
  }

  polygon = new google.maps.Polygon({
    paths: vertices,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.2
  });

  polygon.setMap(map);
}
