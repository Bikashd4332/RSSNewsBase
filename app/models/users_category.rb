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
  scope :preference_of, ->(user){ where(user_id: user.try(:id)) }
end
