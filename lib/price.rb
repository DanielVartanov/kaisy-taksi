class Price < ActiveRecord::Base
  belongs_to :from, :class_name => "Zone"
  belongs_to :to, :class_name => "Zone"

  def self.between(from, to)
    where(:from_id => from.id, :to_id => to.id).first
  end
end
