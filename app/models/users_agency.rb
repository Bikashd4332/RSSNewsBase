class UsersAgency < ActiveRecord::Base
  ##
  # ActiveRecord associations
  belongs_to :agency
  belongs_to :user

  ##
  # ActiveRecord validations
  validates_presence_of :user_id, :agency_id

  ##
  # Scope to get agencies preferred by user
  scope :preferrence_of, ->(user){
    Agency
      .joins(:users_agencies)
      .where('users_agencies.user_id=?', user.id)
  }

  ##
  # Select the categories that user has opted to subscribe.
  def self.selection_from_ids (current_user, agencies)
    agencies.each do |agency|
      # the given agencies should exist in Agency model but not in this.
      if not agency[:selected] and selected? current_user.id, agency[:id]
        UsersAgency.where(user_id: current_user.id, agency_id: agency.id).destroy
      elsif agency[:selected] and not selected? current_user.id, agency[:id]
        UsersAgency.create! user_id: current_user.id, agency_id: agency[:id]
      end
    end
  end

  def self.selected?(user_id, agency_id)
    UsersAgency.where(user_id: user_id, agency_id: agency_id).exists?
  end

end
