class AgencyFeed < ActiveRecord::Base
  ##
  # Active record associations
  has_many :news
  belongs_to :category
  belongs_to :agency

  ##
  # ActiveRecord validation
  validates_presence_of :url, :agency_id, :category_id
  validates_associated :category,
    if: Proc.new {|af| !af.category.nil? and af.category.new_record?}

  validates_associated :agency,
    if: Proc.new {|af| !af.agency.nil? and af.agency.new_record?}

  validates_associated :news, 
    if: Proc.new {|agency_feeds| agency_feeds.news.length }
  
  ##
  # Delegation of property
  delegate :title, to: :category, prefix: true
  delegate :name, to: :agency, prefix: true
end
