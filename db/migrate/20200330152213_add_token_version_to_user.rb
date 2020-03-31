class AddTokenVersionToUser < ActiveRecord::Migration
  def change
    add_column :users, :token_version, :integer, null: false, default: 1
  end
end
