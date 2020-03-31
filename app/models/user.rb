class User < ActiveRecord::Base
  include JWT::Auth::Authenticatable

  ##
  # Server-side Validation
  # ######################
  validates_presence_of :name,
                        :email,
                        :password

  validates_format_of :email,
                      with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i,
                      on: :create

  validates_length_of :password,
                      within: 8..20,
                      message: " Password should be of minimum length 8 and maximum 20"

  validates_confirmation_of :password
  #################################


  DEFAULT_USER_EMAIL = 'user@default.com'

  ##
  # Logic to retrieve the the user from JWT
  # payload.
  #
  # param params => { :id, :token_version, ..}
  def self.find_by_token(params)
    if params[:id] == -1
      return self.get_default_user
    end
    find_by params[:id]
  end

  ##
  # Provider for the default dummy user
  # for the system.
  def self.get_default_user
    User.new(
      email: DEFAULT_USER_EMAIL,
      password: Rails.application.secrets.default_user_password,
      id: -1,
      token_version: 1
    )
  end

end
