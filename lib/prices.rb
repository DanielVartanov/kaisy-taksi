def alpha_price(distance)
  distance < 2 ?
    80 :
    80 + (distance - 2) * 10
end

def express_price(origin, destination)
  zones = Zone.all
  
  origin_zone = zones.find { |zone|
    zone.to_polygon.contains?(origin)
  }
  
  destination_zone = zones.find { |zone|
    zone.to_polygon.contains?(destination)
  }
  
  puts "Price.from(#{origin_zone.name}).to(#{destination_zone.name})"
  Price.between(origin_zone.name, destination_zone.name).value
end

def prices(distance, origin, destination)
  {
    :alpha => alpha_price(distance),
    :express => express_price(origin, destination)
  }
end
