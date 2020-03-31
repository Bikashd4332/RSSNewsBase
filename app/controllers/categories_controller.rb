class CategoriesController < ApplicationController
  # Require token for protected actions
  before_action :require_token

  # Validate access token on all actions
  before_action :validate_access_token

  ## 
  # GET /categories
  #
  # List all the categories present in the categories
  # table
  def index
    render json: { completed: true, data: [] }, status: 200
  end

  ##
  # POST /categories
  #
  # Create a news category
  def create
  end

  ##
  # PUT/PATCH /categories/:id
  #
  # Update info of a specific category
  def update
  end

  ##
  # DELETE /categorie/:id
  #
  # Delete a specific category
  def destroy
  end

end
