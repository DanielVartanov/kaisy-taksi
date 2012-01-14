ActiveRecord::Schema.define(:version => 1) do
  create_table "vertices", :force => true do |t|
    t.integer  "zone_id",   :null => false
    t.string   "lat"
    t.string   "lng"
  end

  create_table "zones", :force => true do |t|
    t.string   "name"
  end

  create_table "prices", :forct => true do |t|
    t.integer "from_id"
    t.integer "to_id"
    t.integer "value"
  end
end
