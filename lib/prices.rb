# -*- coding: utf-8 -*-

def альфа(distance)
  distance < 3 ?
    70 :
    70 + (distance - 3) * 10
end

def удача(distance)
  distance < 2 ?
    80 :
    80 +
    (distance - 2) * 10
end

def super_taxi(distance)
  distance < 1 ?
    60 :
    60 + (distance - 1) * 10
end

def намба(distance)
  distance < 1 ?
    50 :
    50 + (distance - 1) * 10
end

def арго(distance)
  distance < 2 ?
    60 :
    60 + (distance - 2) * 10
end

def телепорт(distance)
  45 + distance * 10
end

def express(origin, destination)
  zones = Zone.all
  
  origin_zone = zones.find { |zone|
    zone.to_polygon.contains?(origin)
  }
  
  destination_zone = zones.find { |zone|
    zone.to_polygon.contains?(destination)
  }

  Price.between(origin_zone.name, destination_zone.name).value if origin_zone.present? and destination_zone.present?
end

def prices(distance, origin, destination)
  {
    'Express Taxi' => { :price => express(origin, destination), :tel => '156', :display_tel => '156' },
    'Альфа такси' => { :price => альфа(distance), :tel => '0312579999', :display_tel => '579999' },
    'Удача' => { :price => удача(distance), :tel => '154', :display_tel => '154' },
    'Супер такси' => { :price => super_taxi(distance), :tel => '152', :display_tel => '152' },
    'Намба такси' => { :price => намба(distance), :tel => '0312976000', :display_tel => '976000' },
    'Арго' => { :price => арго(distance), :tel => '178', :display_tel => '178' },
    'Телепорт' => { :price => телепорт(distance), :tel => '1336', :display_tel => '1336' }
  }
end
