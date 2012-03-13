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

def argo_price(distance)
  distance < 2 ?
    70 :
    70 + (distance - 1) * 10
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
    'Express Taxi' => { :price => express_price(origin, destination), :tel => '156', :display_tel => '156' },
    'Альфа такси' => { :price => alpha_price(distance), :tel => '0312579999', :display_tel => '579999' },
    'Удача' => { :price => udacha_price(distance), :tel => '154', :display_tel => '154' },
    'Супер такси' => { :price => supertaxi_price(distance), :tel => '152', :display_tel => '152' },
    'Намба такси' => { :price => namba_price(distance), :tel => '0312976000', :display_tel => '976000' },
    'Арго' => { :price => argo_price(distance), :tel => '178', :display_tel => '178' }
  }
end
