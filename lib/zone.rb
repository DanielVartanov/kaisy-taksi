class Zone < Struct.new(:name, :vertices)
  extend YamlStorage
  yaml_storage 'data/zones.yml'

  def self.all
    @all ||= yaml.keys.map { |name| Zone.new(name, yaml[name]) }
  end
  
  def to_polygon
    @polygon ||= Geometry::Polygon.new(points)
  end

  def points
    @vertices ||= vertices.map do |vertex|
      Geometry::Point.new(vertex[0].to_f, vertex[1].to_f)
    end
  end
end
