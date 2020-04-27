class Api::V1::UsersAgenciesController < ApplicationController
  ##
  # before_action JWT validation on each request
  before_action :validate_access_token
  before_action :require_token

  ## There's no reason to set the user because access token
  # will already point to the user.

  ##
  # GET /users_categories.json
  def index # Fetch all the categories the current user has preferred.
    @users_categories = UsersCategory.preference_of current_user
    render :index, status: :ok
  end

  ##
  # POST /user_categories.json
  #
  # take an array of ids as param and subscribe
  # to those categories
  def create
  end

end
