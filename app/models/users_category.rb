class UsersCategory < ActiveRecord::Base

  ##
  # ActiveRecord associations
  belongs_to :user
  belongs_to :category
  has_many :news

  ##
  # ActiveModel validations
  validates_presence_of :user_id, :category_id
  validates_uniqueness_of :category_id, scope: :user_id

  ##
  # ActiveRecord scope
  scope :preferrence_of, ->(user){
    Category
    .joins(:users_categories)
    .where('users_categories.user_id = ?', user.id)
  }

  ##
  # Select the categories that user has opted to subscribe.
  def self.selection_from_ids (current_user, categories)
    categories.each do |category|
      # the given category should exist in Category model but not in this.
      if not category[:selected] and selected? current_user.id, category[:id]
        UsersCategory.where(user_id: current_user.id, category_id: category[:id]).first.destroy
      elsif category[:selected] and not selected? current_user.id, category[:id]
        UsersCategory.create! user_id: current_user.id, category_id: category[:id]
      end
    end
  end

  def self.selected? (user_id, category_id)
    UsersCategory.where(user_id: user_id, category_id: category_id).exists?
  end

end
