def alpha_price(distance)
  distance < 2 ?
    80 :
    80 + (distance - 2) * 10
end

def express_price(origin, destination)
  100
end

def prices(distance)
  {
    :alpha => alpha_price(distance),
    :express => express_price(nil, nil)
  }
end
