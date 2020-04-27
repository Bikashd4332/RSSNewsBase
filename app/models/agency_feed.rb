class AgencyFeed < ActiveRecord::Base
  include ActiveModel::Validations

  ##
  # Active record associations
  has_many   :news
  belongs_to :category
  belongs_to :agency

  ##
  # ActiveRecord validation
  validates_presence_of :url, :agency_id, :category_id

  ##
  # Url validation with custom validator
  validates_with Validators::UrlValidator

  ##
  # For every category_id agency_id should be unique
  validates_uniqueness_of :agency_id, scope: :category_id

  ##
  # After validation of itself run it for associations.
  validates_associated :category,
    if: Proc.new {|af| !af.category.nil? and af.category.new_record?}

  validates_associated :agency,
    if: Proc.new {|af| !af.agency.nil? and af.agency.new_record?}

  validates_associated :news, 
    if: Proc.new {|agency_feeds| agency_feeds.news.length }
  
  ##
  # Delegation of property
  delegate :id, :name, to: :category, prefix: true
  delegate :id, :name,  to: :agency,   prefix: true
end
