#!/usr/bin/env ruby -w

require 'active_record'
require 'logger'
require 'nokogiri'
require_relative 'kaisy_taxi'

ActiveRecord::Base.logger = Logger.new(STDOUT)
ActiveRecord::Base.establish_connection :adapter => 'sqlite3', :database => 'zones.db'

Zone.delete_all
Vertex.delete_all

filename = ARGV[0]

# I don't know why Nokogiri::XML::ParseOptions::NOBLANKS does not work
# in this  case (not well-formed KML file?). That's why have to do
# this black magick. Please fix if you find a proper solution.
text = File.read(filename).gsub(/\s\s+/, ' ').gsub('> ', '>').gsub(' <', '<').gsub("\n", '')
xml = Nokogiri.XML text
doc = xml.root.children.first
reparsed_doc = Nokogiri.XML(doc.to_xml)

placemarks = reparsed_doc.xpath('//Placemark')

placemarks.each do |placemark|
  zone_name = placemark.xpath('.//name').text
  points = placemark.xpath('.//coordinates').text.split(' ')

  zone = Zone.create! :name => zone_name
  puts zone.inspect

  points.each do |point|
    latlng = point.split(',')
    vertex = Vertex.create! :lat => latlng[1], :lng => latlng[0], :zone => zone
    puts vertex.inspect
  end
end
