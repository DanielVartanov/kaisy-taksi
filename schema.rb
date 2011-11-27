ActiveRecord::Schema.define(:version => 1) do
  create_table "vertices", :force => true do |t|
    t.integer  "zone_id",   :null => false
    t.string   "lat"
    t.string   "lng"
  end

  create_table "zones", :force => true do |t|
    t.string   "name"
  end
end
