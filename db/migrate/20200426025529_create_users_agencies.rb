class CreateUsersAgencies < ActiveRecord::Migration
  def change
    create_table :users_agencies do |t|
      t.timestamps null: false
    end
  end
end
