function refreshZone(map, zoneName) {
  latlngs = pullFromServer(zoneName);
  markers = createMarkers(latlngs);

  updateMarkerFunction = generateUpdateMarkerFunction(zoneName, markers);
  setMarkersEvents(markers, updateMarkerFunction);

  drawZone(markers);
}

function generateUpdateMarkerFunction(zoneName, markers) {
  return function(vertexId, newPosition) {
    pushToServer(zoneName, vertexId, newPosition);
    drawZone(markers);
  };
}

function createMarkers(latlngs) {
  return latlngs.map(function(latlng) {
    marker = placeMarker(latlng);
    marker.id = latlng.id;
    return marker;
  });
}

function setMarkersEvents(markers, updateMarkerFunction) {
  markers.map(function(marker) {
    google.maps.event.addListener(marker, 'dragend', function(event) {
      updateMarkerFunction(marker.id, event.latLng);
    });
  });
}

function verticesFromMarkers(markers) {
  return markers.map(function(marker) {
    return marker.getPosition();
  });
}

function drawZone(markers) {
  if (markers.length >= 3) {
    drawPolygon(verticesFromMarkers(markers));
  }
}

function pullFromServer(zoneName) {
  var request = new XMLHttpRequest();
  request.open("GET", "zones/" + zoneName, false);
  request.send(null);
  vertices = JSON.parse(request.responseText);

  return vertices.map(function(vertex) {
    latlng = new google.maps.LatLng(vertex["lat"], vertex["lng"])
    latlng.id = vertex["id"]
    return latlng
  });
}

function vertexURL(zoneName, vertexId) {
  return "zones/" + zoneName + "/" + vertexId
}

function pushToServer(zoneName, vertexId, newPosition) {
  var request = new XMLHttpRequest();
  request.open("PUT", vertexURL(zoneName, vertexId), false);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(newPosition));
}
