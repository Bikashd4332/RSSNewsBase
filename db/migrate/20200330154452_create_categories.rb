class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :title, unique: true, null: false
      t.text   :description, null: false, length: 30
      t.timestamps null: false
    end
  end
end
