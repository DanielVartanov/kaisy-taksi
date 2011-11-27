function vertices(markers) {
  return markers.map(function(marker) {
    return marker.position;
  });
}

function flush(zone) {
  pushToServer(vertices(zone));
  drawZone(zone);
}

function drawZone(zone) {
  if (zone.length >= 3) {
    drawPolygon(vertices(zone));
  }
}

function addVertexToZone(zone, point) {
  var marker = placeMarker(point);
  
  google.maps.event.addListener(marker, 'dragend', function() {
    flush(zone);
  });

  zone.push(marker);
}

function startMarkingUp(map, vertices) {
  var zone = new Array();
  vertices.map(function(vertex){
    addVertexToZone(zone, new google.maps.LatLng(vertex["lat"], vertex["lng"]));
  });
  
  drawZone(zone);

  google.maps.event.addListener(map, 'click', function(event) {
    addVertexToZone(zone, event.latLng);
    flush(zone);
  });
}

function pushToServer(zone) {
  var request = new XMLHttpRequest();
  request.open("PUT", "zones/1", true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(zone));
}
