class Agency < ActiveRecord::Base
  ##
  # ActiveRecord associations
  has_many :agency_feeds
  has_many :categories, through: :agency_feeds
  has_many :users_agencies
  has_many :users, through: :users_agencies


  ##
  # Adding  file upload handler
  mount_uploader :logo_path, AgencyLogoUploader

  ##
  # ActiveRecord validations
  validates_presence_of :name
  validates_length_of   :name, within: 2..30
  validates_associated :agency_feed,
    if: Proc.new {|agency| !agency.agency_feed.nil? &&
                  agency.agency_feed.length }
end
