class Category < ActiveRecord::Base

  ##
  # ActiveRecord Associations declaration
  has_many :news
  has_many :agency_feed
  
  ##
  # ActiveRecord Validations
  validates_presence_of :title

end
