#!/usr/bin/env ruby -w
# -*- coding: utf-8 -*-

require "roo"
require "active_record"
require "logger"

require_relative "kaisy_taxi"

ActiveRecord::Base.establish_connection :adapter => 'sqlite3', :database => 'express-taxi.db', :pool => 25

@xls = Excel.new('doc/express-taxi-prices.xls')
Price.delete_all

NUMBER_INDEX = {
  'A' => 0,
  'B' => -1,
  'C' => -2
}

RUSSIAN_TO_ENGLISH = {
  'А' => 'A',
  'В' => 'B',
  'С' => 'C'
}

def to_zone_name(column_index)
  letter = RUSSIAN_TO_ENGLISH[@xls.cell(4, column_index)]
  number = @xls.cell(3, column_index + NUMBER_INDEX[letter])

  "#{number.to_i}#{letter}"
end

def from_zone_name(row_index)
  letter = RUSSIAN_TO_ENGLISH[@xls.cell(row_index, 2)]
  number = @xls.cell(row_index + NUMBER_INDEX[letter], 1)

  "#{number.to_i}#{letter}"
end

(5..39).each do |row_index|
  (3..37).each do |column_index|
    price_value = @xls.cell(row_index, column_index)

    from_zone = Zone.find_by_name(from_zone_name(row_index))
    to_zone = Zone.find_by_name(to_zone_name(column_index))
    if from_zone && to_zone
      price = Price.new :from => from_zone, :to => to_zone, :value => price_value
      price.save!
      puts price.inspect
    else
      puts "no zone for '#{from_zone_name(row_index)}' or '#{to_zone_name(column_index)}'"
    end
  end
end
