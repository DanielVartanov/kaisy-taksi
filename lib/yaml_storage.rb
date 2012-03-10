module YamlStorage
  def yaml_storage(file_name)
    mod = Module.new do
      define_method(:yaml) do
        @yaml ||= YAML.load_file(file_name)
      end
    end
    
    extend mod
  end
end
