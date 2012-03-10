class Price < Struct.new(:value)
  extend YamlStorage
  yaml_storage 'data/prices.yml'

  def self.between(from, to)
    new(yaml[from][to])
  end
end
