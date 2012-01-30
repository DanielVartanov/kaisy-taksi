$(document).ready(function() {
  var distance, origin, destination;
  var kaisy_taxi_map = KaisyTaxi.Map();

  $('#search').click(function(e) {
    if (distance) {
      $.getJSON("/prices",
        {
          distance: distance / 1000,
          origin: {lat: origin.lat(), lng: origin.lng()},
          destination: {lat: destination.lat(), lng: destination.lng() }
        },
        function(response) {
          $('#taxi_list tbody').html(
            jm.render(function(b) {
              var i = 0
              _(response).each(function(sum, taxi) {
                i++;
                b.tr(function() {
                  b.td(function() { b.text(i) });
                  b.td(function() { b.text(taxi) });
                  b.td(function() { b.text(sum) });
                });
              })
            })
          );
        }
      );
    }
  });

  $('#remove_route').click(function() {
    kaisy_taxi_map.remove_route();
    distance = false;
  });


  kaisy_taxi_map.init($('#map').get(0), function(calculated_distance, origin_from_map, destination_from_map) {
    distance = calculated_distance;
    origin = origin_from_map;
    destination = destination_from_map;
  });

});
