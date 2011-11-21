var map;
var route = new Array();

var directionsService;
var directionsDisplay;

function initialize() {
  var latlng = new google.maps.LatLng(42.830022, 74.587883);
  var myOptions = {
    zoom: 13,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);

  google.maps.event.addListener(map, 'click', function(event) {
    point = event.latLng
    route.push(point);
    placeMarker(point);
    
    if (route.length >= 2) {
      drawRoute();
    }
  });
}

function drawRoute() {
  var request = {
    origin: route[0], 
    destination: route[1],
    travelMode: google.maps.DirectionsTravelMode.DRIVING
  };
  
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      var leg = response.routes[0].legs[0];
      directionsDisplay.setDirections(response);
      calculateRouteCost(leg.distance.value);
    }
  });
}

function placeMarker(location) {
  var marker = new google.maps.Marker({
    position: location, 
    map: map
  });
}

function calculateRouteCost(distance) {
  var request = new XMLHttpRequest();
  request.open("GET", distance / 1000, false);
  request.send(null);
  alert(request.responseText);
  return distance;
}
