function refreshZone(map, zoneName) {
  updateMarkerFunction = function(vertexId, newPosition) {
    pushToServer(zoneName, vertexId, newPosition);
    refreshZone(map, zoneName);
  };
  
  addMarkerFunction = function(vertexId, latlng) {
    marker = placeMarker(latlng);

    google.maps.event.addListener(marker, 'dragend', function(event) {
      marker.setMap(null);
      updateMarkerFunction(vertexId, event.latLng);
    });
    
    return marker;
  }
  
  vertices = pullFromServer(zoneName);
  
  markers = vertices.map(function(vertex) {
    return addMarkerFunction(vertex["id"], vertex["latlng"]);
  });
  
  drawZone(markers);
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
    return {
      "id": vertex["id"],
      "latlng": new google.maps.LatLng(vertex["lat"], vertex["lng"])
    }
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
