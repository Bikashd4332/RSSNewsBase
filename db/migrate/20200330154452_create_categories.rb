class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :name, unique: true, null: false
      t.text   :description, null: false, length: 30
      t.string   :icon, null: true
      t.timestamps null: false
    end
  end
end
