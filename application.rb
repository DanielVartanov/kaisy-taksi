require "sinatra"
require "slim"
require "json"

require "./lib/prices"

set :public_folder, File.dirname(__FILE__) + '/public'
Slim::Engine.set_default_options :pretty => true

get '/' do
  slim :index
end

get '/:distance' do
  distance = params[:distance].to_f
  prices(distance).to_json
end
