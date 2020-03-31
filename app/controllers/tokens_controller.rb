class TokensController < ApplicationController
  # validate refresh token on update
  before_action :validate_refresh_token, only: :update

  # Require refresh token only on update
  before_action :require_token , only: :update

  # Set the user up for authentication
  before_action :set_user



  ##
  # POST /token
  # Sign in the user
  def create
    set_refresh_token @user

    render json: { completed: true }
  end


  ##
  # PATCH /token
  # renew access token
  def update
    set_access_token

    render json: { completed: true }
  end

  private
  def set_user
    if params[:email] == User::DEFAULT_USER_EMAIL
      @user = User.get_default_user 
    else
      @user = User.find_by_email params[:email]
      raise JWT::Auth::UnaouthorizedError if @user
    end
  end
end
