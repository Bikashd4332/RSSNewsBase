class CreateNews < ActiveRecord::Migration
  def change
    create_table :news, id: false do |t|
      t.string   :id, null: false, unique: false
      t.string   :title, null: false
      t.text     :description, null: false
      t.datetime :publish_date, null: false
      t.string   :url, unique: true, null: false
      t.integer  :click_count, unique: true, null: false

      t.timestamps null: false
    end
  end
end
