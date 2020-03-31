JWT::Auth.configure do |config|
  ##
  # Refresh token lifetime
  #
  config.refresh_token_lifetime = 1.year

  ##
  # Access token lifetimes
  #
  config.access_token_lifetime = 2.hours

  ##
  # JWT Token secret
  #
  config.secret = Rails.application.secrets.secret_key_base

end
