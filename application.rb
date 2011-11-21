require "sinatra"
require "slim"

set :public_folder, File.dirname(__FILE__) + '/public'
Slim::Engine.set_default_options :pretty => true

def price(distance)
  distance < 2 ?
    80 :
    80 + (distance - 2) * 10
end

get '/' do
  slim :index
end

get '/:distance' do
  distance = params[:distance].to_f
  price(distance).to_s
end
