class ApplicationController < ActionController::API
  include JWT::Auth::Authentication
  ##
  # handle critical exceptions by sending imformative response.
  include Errors::ErrorHandler

  ##
  # validate the intergity of token if found.
  before_action :validate_token
end
