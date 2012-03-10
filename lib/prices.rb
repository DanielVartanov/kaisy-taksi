# -*- coding: utf-8 -*-
def alpha_price(distance)
  distance < 2 ?
    80 :
    80 + (distance - 2) * 10
end

def udacha_price(distance)
  alpha_price(distance)
end

def supertaxi_price(distance)
  distance < 1 ?
    60 :
    60 + (distance - 1) * 10
end

def namba_price(distance)
  distance < 1 ?
    50 :
    50 + (distance - 1) * 10
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
    'Альфа такси' => alpha_price(distance),
    'Express Taxi' => express_price(origin, destination),
    'Удача' => udacha_price(distance),
    'Супер такси' => supertaxi_price(distance),
    'Намба такси' => namba_price(distance)
  }
end
