class Category < ActiveRecord::Base

  ##
  # ActiveRecord Associations declaration
  has_many :users_categories
  has_many :users, through: :users_categories
  has_many :agency_feeds
  has_many :news, through: :agency_feeds

  ##
  # Adding file upload handler
  mount_uploader :icon, CategoryIconUploader

  ##
  # ActiveRecord Validations
  validates_presence_of :name, :description
  validates_length_of :name, within: 2..20
  validates_length_of :description, within: 2..40
  validates_associated  :news,
    if: Proc.new {|category| category.news.length > 0}

  validates_associated  :agency_feeds,
    if: Proc.new {|category| category.agency_feeds.length > 0 }

end
