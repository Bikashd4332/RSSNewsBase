class CreateNews < ActiveRecord::Migration
  def change
    create_table :news do |t|
      t.string :news, null: false
      t.text :description, null: false
      t.datetime :publish_date, null: false
      t.string :url, unique: true, null: false
      t.integer :click_count, unique: true, null: false

      t.timestamps null: false
    end
  end
end
