class AddForeignKeyAgencyIdCategoryIdToAgencyFeed < ActiveRecord::Migration
  def change

    add_reference :agency_feeds, :category, null: false, index: true
    add_reference :agency_feeds, :agency, null: false, index: true

    add_foreign_key :agency_feeds, :categories
    add_foreign_key :agency_feeds, :agencies

  end
end
