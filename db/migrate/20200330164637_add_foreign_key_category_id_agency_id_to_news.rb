class AddForeignKeyCategoryIdAgencyIdToNews < ActiveRecord::Migration
  def change

    ## set agency_feed instead of category_id and agency_id
    #
    add_reference :news, :agency_feed, null: false, index: true
    add_foreign_key :news, :agency_feeds

  end
end
