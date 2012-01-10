class Zone < ActiveRecord::Base
  has_many :vertices

  def to_polygon
    @polygon ||= Geometry::Polygon.new(vertices.map(&:to_point))
  end
end
