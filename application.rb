require "sinatra"
require "slim"
require "json"
require "active_record"
require "sqlite3"
require "logger"
require "awesome_print"
require "pp"
require "geometry"
require "rack/mobile-detect"

use Rack::MobileDetect

require_relative "kaisy_taxi"

set :public_folder, File.dirname(__FILE__) + '/public'
Slim::Engine.set_default_options :pretty => true
Slim::Engine.default_options[:disable_escape] = true

ActiveRecord::Base.logger = Logger.new(STDOUT)
ActiveRecord::Base.establish_connection :adapter => 'sqlite3', :database => 'express-taxi.db', :pool => 25

get '/' do
  unless env["X_MOBILE_DEVICE"].nil?
    slim :mobile, :layout => false
  else
    slim :index
  end
end

get '/mobile' do
  slim :mobile, :layout => false
end

get '/prices' do
  distance = params[:distance].to_f
  origin = Geometry::Point.new(params[:origin_lat].to_f, params[:origin_lng].to_f)
  destination = Geometry::Point.new(params[:destination_lat].to_f, params[:destination_lng].to_f)

  prices(distance, origin, destination).to_json
end
