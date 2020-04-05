class Api::V1::TokensController < ApplicationController
  # validate refresh token on update
  before_action :validate_refresh_token, only: :update

  # Require refresh token only on update
  before_action :require_token , only: :update

  # Set the user up for authentication
  before_action :set_user

  ##
  # POST /token
  # Sign in the user
  def sign_in
    set_refresh_token @user

    logger.info("Successfully Signed in user:#{@user.id}")
    render json: { user: @user }, status: :ok
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
      @user = User.find_by current_user.id
      raise JWT::Auth::UnauthorizedError unless @user
    end

  end
end
