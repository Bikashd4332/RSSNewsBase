class CreateAgencyFeeds < ActiveRecord::Migration
  def change
    create_table :agency_feeds do |t|
      t.string :url, null: false
      t.timestamps null: false
    end
  end
end
