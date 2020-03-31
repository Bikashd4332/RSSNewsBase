class CreateAgencies < ActiveRecord::Migration
  def change
    create_table :agencies do |t|
      t.string :name, unique: true, null: false
      t.string :logo_path, null: true
      t.timestamps null: false
    end
  end
end
