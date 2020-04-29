class Api::V1::UsersCategoriesController < ApplicationController
  ##
  # Validate AccessToken on request
  before_action :validate_token
  before_action :validate_access_token

  ##
  # GET /users_categories.json
  def index
    @categories = UsersCategory.preferrence_of current_user
    render template: 'api/v1/categories/index', status: :ok
  end

  ##
  # POST /users_categories/id
  # subscribe to the category with the provided id.
  def create
    UsersCategory.selection_from_ids(
      current_user,
      params[:category_selection]
    )
  end

end
