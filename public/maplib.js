var KaisyTaxi = KaisyTaxi || {}

KaisyTaxi.Map = function() {
  var route = [];
  var map;
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
  var on_draw_route;

  function add_point(point) {

    var marker = new google.maps.Marker({ position: point, map: map });
    route.push(marker);

    if (route.length == 3) {
      _(route).first().setMap(null);
      route.shift();
    }

    if (route.length == 2) {
      draw_route();
    }
  }

  function draw_route() {
    var request = {
      origin: route[0].getPosition(),
      destination: route[1].getPosition(),
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    directionsDisplay.setMap(map);
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        var leg = response.routes[0].legs[0];
        directionsDisplay.setDirections(response);
        on_draw_route(leg.distance.value, leg.start_location, leg.end_location);
      }
    });

  }

  function set_center(point) {
    map.setCenter(point);
  }

  function current_location(map) {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        set_center(initialLocation);
        add_point(initialLocation);
      }, function() {
      });
    // Try Google Gears Geolocation
    } else if (google.gears) {
      var geo = google.gears.factory.create('beta.geolocation');
      geo.getCurrentPosition(function(position) {
        initialLocation = new google.maps.LatLng(position.latitude,position.longitude);
        set_center(initialLocation);
        add_point(initialLocation);
      }, function() {
      });
    // Browser doesn't support Geolocation
    }
  }

  return {
    init: function(container, calculate_callback) {
      var latlng = new google.maps.LatLng(42.830022, 74.587883);
      var myOptions = {
        zoom: 13,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(container, myOptions);
      current_location(map);
      on_draw_route = calculate_callback;

      google.maps.event.addListener(map, 'click', function(event) {
        point = event.latLng
        add_point(point);
      });
    },
    remove_route: function() {
      _(route).each(function(marker) {
        marker.setMap(null);
      });
      directionsDisplay.setMap(null);
      route = [];
    }
  }
}
