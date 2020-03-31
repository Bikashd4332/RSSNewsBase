class User < ActiveRecord::Base
  include JWT::Auth::Authenticatable

  DEFAULT_USER_EMAIL = 'user@default.com'

  def self.find_by_token(params)
    find_by params.merge
  end

  def self.get_default_user
    User.new(email: DEFAULT_USER_EMAIL,
             password: Rails.application.secrets.default_user_password)
  end

end
