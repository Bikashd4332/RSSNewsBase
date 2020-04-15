class User < ActiveRecord::Base
  include JWT::Auth::Authenticatable

  ##
  # Specifying secure password storage by hashing it
  has_secure_password

  ##
  # ActiveRecord validations
  validates_presence_of :name, :email, :password

  validates_format_of :email,
                      with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i,
                      on: :create

  validates_length_of :password,
                      within: 8..20,
                      message: " Password should be of minimum length 8 and maximum 20"

  validates_confirmation_of :password

  validates_with Validators::EmailUniqueValidator

  DEFAULT_USER_EMAIL = 'user@default.com'

  ##
  # Logic to retrieve the the user from JWT
  # payload.
  #
  # param :params => { :id, :token_version, ..}
  def self.find_by_token(params)
    # if id matched to -1 then consider it
    # to be the default user.
    return self.get_default_user if params[:id] == -1
    find_by params[:id]
  end

  ##
  # Provider for the default dummy user
  # for the system.
  def self.get_default_user
    User.new(
      name: 'default',
      email: DEFAULT_USER_EMAIL,
      password: Rails.application.secrets.default_user_password,
      id: -1,
      token_version: 1
    )
  end

  private
  def email_uniqueness
    begin
      User.find_by_email email
      ## Record found then user already exists.
      errors.add(:email, "Email is already taken!")
    rescue => exception
      ## Every this good here.
    end
  end
end