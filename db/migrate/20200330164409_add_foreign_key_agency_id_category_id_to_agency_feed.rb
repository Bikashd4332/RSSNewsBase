class AddForeignKeyAgencyIdCategoryIdToAgencyFeed < ActiveRecord::Migration
  def change

    add_reference :agency_feeds, :categories, null: false, index: true
    add_reference :agency_feeds, :agencies, null: false, index: true

    add_foreign_key :agency_feeds, :categories, column: :categories_id
    add_foreign_key :agency_feeds, :agencies, column: :agencies_id

  end
end
