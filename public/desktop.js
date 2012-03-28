$(document).ready(function() {
  var distance, origin, destination;
  var kaisy_taxi_map = KaisyTaxi.Map();

  $('#clear-route').click(function() {
    kaisy_taxi_map.remove_route();
    distance = false;
    $('#taxi_list tbody').html('');
  });

  $(window).resize(function() {
    $('#map').height( window.innerHeight - 80);
  });

  $(window).resize();

  kaisy_taxi_map.init($('#map').get(0), function(calculated_distance, origin_from_map, destination_from_map) {
    distance = calculated_distance;
    origin = origin_from_map;
    destination = destination_from_map;

    if (distance) {
      $.getJSON("/prices",
        {
          distance: distance / 1000,
          origin: {lat: origin.lat(), lng: origin.lng()},
          destination: {lat: destination.lat(), lng: destination.lng() }
        },
        function(response) {
          var tel = "156";
          $('#taxi_list tbody').html(
            jm.render(function(b) {
              _(response).each(function(info, taxi) {
                b.tr(function() {
                  b.td(function() {
                    b.h5(function() { b.text(taxi) });
                    b.a(
                      {href: "tel:" + info["tel"]},
                      function() { b.text(info["display_tel"]) }
                    );
                  });
                  b.td(function() { b.text(Math.floor(info["price"])) });
                });
              })
            })
          );
        }
      );
    }
  });

});
