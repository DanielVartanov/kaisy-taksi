$(document).ready(function() {
  var distance;
  var kaisy_taxi_map = KaisyTaxi.Map();

  function show_result(u, data) {
    var page = $('#list');
    $.getJSON(distance / 1000, function(response) {
      $('#list :jqmData(role=content)').html('<ul data-role="listview" data-inset="true"></ul>');
      _(response).each(function(sum, taxi) {
        var elem = $("<li></li>");
        elem.text(taxi + ": " + sum);
        $('#list :jqmData(role=content) ul').append(elem);
      });
      $('#list').find( ":jqmData(role=listview)" ).listview();
    });
  }

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

  kaisy_taxi_map.init($('#map').get(0), function(calculated_distance) {
    distance = calculated_distance;
  });

});
