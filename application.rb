require "sinatra"
require "slim"
require "json"
require "logger"
require "pp"
require "yaml"
require "geometry"
require "rack/mobile-detect"
require 'active_support/core_ext/object/blank'

use Rack::MobileDetect

require_relative "kaisy_taxi"

set :public_folder, File.dirname(__FILE__) + '/public'
Slim::Engine.set_default_options :pretty => true
Slim::Engine.default_options[:disable_escape] = true

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
  origin = Geometry::Point.new(params[:origin][:lat].to_f, params[:origin][:lng].to_f)
  destination = Geometry::Point.new(params[:destination][:lat].to_f, params[:destination][:lng].to_f)

  prices(distance, origin, destination).to_json
end
