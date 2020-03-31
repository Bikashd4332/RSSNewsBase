class User < ActiveRecord::Base
  include JWT::Auth::Authenticatable

  DEFAULT_USER_EMAIL = 'user@default.com'

  def self.find_by_token(params)
    if params[:id] == -1
      return self.get_default_user
    end
    find_by params[:id]
  end

  def self.get_default_user
    User.new(
      email: DEFAULT_USER_EMAIL,
      password: Rails.application.secrets.default_user_password,             id: -1,
      token_version: 1
    )
  end

end
