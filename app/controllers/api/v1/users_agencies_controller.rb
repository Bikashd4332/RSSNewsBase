class Api::V1::UsersAgenciesController < ApplicationController
  ##
  # before_action JWT validation on each request
  before_action :require_token
  before_action :validate_access_token

  ## There's no reason to set the user because access token
  # will already point to the user.

  ##
  # GET /users_categories.json
  def index
    # Fetch all the categories the current user has preferred.
    @agencies = UsersAgency.preferrence_of current_user
    render template: 'api/v1/agencies/index', status: :ok
  end

  ##
  # POST /user_categories.json
  #
  # take an array of ids as param and subscribe
  # to those categories
  def create
    UsersAgency.selection_from_ids(current_user, params[:agency_selection])
    head :created
  end
end
