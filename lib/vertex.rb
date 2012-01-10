class Vertex < ActiveRecord::Base
  belongs_to :zone

  def to_point
    @point ||= Geometry::Point.new(lat.to_f, lng.to_f) # SHAME!
  end

  def to_s
    [lat, lng].to_s
  end
end
