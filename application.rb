require "sinatra"
require "haml"

set :public_folder, File.dirname(__FILE__) + '/public'

get '/' do
  haml :index
end
