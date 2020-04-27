class AddForeignKeyToUsersCategoriesAndUsersAgencies < ActiveRecord::Migration
  def change
    ## users_categories
    add_reference :users_categories, :user, foreign_key: true, index: true
    add_reference :users_categories, :category, foreign_key: true, index: true

    ## users_agencies
    add_reference :users_agencies, :user, foreign_key: true, index: true
    add_reference :users_agencies, :agency, foreign_key: true, index: true
  end
end
