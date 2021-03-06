class Api::V1::TokensController < ApplicationController
  # validate refresh token on update
  before_action :validate_refresh_token, only: :refresh

  # Require refresh token only on update
  before_action :require_token , only: :refresh

  # Set the user up for authentication
  before_action :set_user, only: [ :refresh, :sign_in]

  ##
  # POST /token
  # Sign in the user
  def sign_in
    set_refresh_token @user

    logger.info("Successfully Signed in user:#{@user.id}")
    render :user, status: :ok
  end


  ##
  # PATCH /token
  # renew access token
  def refresh
    set_access_token

    logger.info("Successfully refreshed/created access token.")
    head :ok
  end


  private
  def set_user
    if (params[:email] || current_user.try(:email)) == User::DEFAULT_USER_EMAIL
      @user = User.get_default_user
      logger.warn("Authenticating default user!")
    else
      ##
      # When the client tries to get authenticated initially for refresh token.
      if params[:email] && params[:password]
          @user = User.find_by_email params[:email]
          ##
          # If unmatched password then raise error.
          raise JWT::Auth::UnauthorizedError, 'invalid credential' unless @user.authenticate(params[:password])
      else
        ##
        # When the client to refresh access token with already obtained refresh token
          @user = current_user
      end
    end
  end
end