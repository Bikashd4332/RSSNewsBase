class CategoriesController < ApplicationController
  # Require token for protected actions
  before_action :require_token

  # Validate access token on all actions
  before_action :validate_access_token

  # Set @category on action call
  before_action :set_category, only: [:update, :destroy]

  ## 
  # GET /categories
  #
  # List all the categories present in the categories
  # table
  def index
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

  private
  ##
  # Strict parameters
  def category_params
    params.require(:category).permit(:id, :title)
  end

  ##
  # load from db
  def set_category
    @category = Category.find_by category_params[:id]
  end

end
