require "sinatra"
require "slim"
require "json"
require "active_record"
require "sqlite3"
require "logger"
require "awesome_print"
require "pp"

require "./lib/prices"

set :public_folder, File.dirname(__FILE__) + '/public'
Slim::Engine.set_default_options :pretty => true
Slim::Engine.default_options[:disable_escape] = true

ActiveRecord::Base.logger = Logger.new(STDOUT)
ActiveRecord::Base.establish_connection :adapter => 'sqlite3', :database => 'zones.db', :pool => 5

class Zone < ActiveRecord::Base
  has_many :vertices
end

class Vertex < ActiveRecord::Base
  belongs_to :zone

  self.include_root_in_json = false

  def as_json(options)
    options ||= {}
    super options.merge :except => [:id, :zone_id]
  end
end

get '/' do
  slim :index
end

get '/markup-zones' do
  @zone = Zone.find_by_name("1")
  slim :markup_zones
end

put '/zones/1' do
  vertices = JSON.parse(request.body.read)
  vertices.map! { |vertex| { :lat => vertex["Pa"], :lng => vertex["Qa"] } }
  
  zone = Zone.find_by_name("1")
  zone.vertices.destroy_all
  vertices.each do |vertex|
    zone.vertices.create! vertex
  end
  
  ""
end

get '/:distance' do
  distance = params[:distance].to_f
  prices(distance).to_json
end
