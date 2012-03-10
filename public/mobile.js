$(document).ready(function() {
  var distance, origin, destination;
  var kaisy_taxi_map = KaisyTaxi.Map();

  function show_result(u, data) {
    var page = $('#list');
    $.getJSON("/prices",
      {
        distance: distance / 1000,
        origin: {lat: origin.lat(), lng: origin.lng()},
        destination: {lat: destination.lat(), lng: destination.lng() }
      },
      function(response) {
        $('#list :jqmData(role=content) ul').html(
          jm.render(function(b) {
            _(response).each(function(info, taxi) {
              b.li(function() {
                b.a({"href": "tel:" + info["tel"]}, function() {
                  b.h4(function() {
                    b.text( taxi + " " + info["display_tel"] );
                  });
                  b.text( Math.floor(info["price"]) + " сом" );
                });
              });
            });
          })
        );
        $('#list').find( ":jqmData(role=listview)" ).listview("destroy").listview();
      }
    );
  }

  // for iOS
  window.addEventListener("load",function() {
    setTimeout(function(){
      window.scrollTo(0, 1);
    }, 0);
  });

  $('#search').click(function(e) {
    if (!distance) {
      $.mobile.changePage('#route_missing_warning');
      return false;
    }
  });

  $('#remove_route').click(function() {
    kaisy_taxi_map.remove_route();
    distance = false;
  });

  $(document).bind( "pagebeforechange", function( e, data ) {
    if ( typeof data.toPage === "string" ) {
      var u = $.mobile.path.parseUrl( data.toPage ),
      list_re = /^#list/;

      if ( u.hash.search(list_re) !== -1 ) {
        show_result(u, data);
      }
    }
  });

  $(window).resize(function() {
    $('#map').height( window.innerHeight - 41);
  });

  $(window).resize();

  kaisy_taxi_map.init($('#map').get(0), function(calculated_distance, origin_from_map, destination_from_map) {
    distance = calculated_distance;
    origin = origin_from_map;
    destination = destination_from_map;
  });
});
