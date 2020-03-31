class Category < ActiveRecord::Base
  has_many :news
  has_many :agency_feed
end
