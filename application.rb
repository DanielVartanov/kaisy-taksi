require "sinatra"
require "haml"

set :public_folder, File.dirname(__FILE__) + '/public'

def price(distance)
  distance < 2 ?
    80 :
    80 + (distance - 2) * 10
end

get '/' do
  haml :index
end

get '/:distance' do
  distance = params[:distance].to_f
  price(distance).to_s
end
