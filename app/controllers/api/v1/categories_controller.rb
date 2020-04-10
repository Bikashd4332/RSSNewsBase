class Api::V1::CategoriesController < ApplicationController
  # Require token for protected actions
  #before_action :require_token

  # Validate access token on all actions
  #before_action :validate_access_token

  # Set @category on action call
  before_action :set_category, only: [:update, :destroy]

  ##
  # GET /categories
  #
  # List all the categories present in the categories
  # table
  def index
    @categories = Category.all
    render :index, status: :ok
  end

  ##
  # POST /categories
  #
  # Create a news category
  def create
    @category = Category.create! category_params
    logger.info "New category #{@category.name} is saved."
    render :show, status: :created
  end

  ##
  # PUT/PATCH /categories/:id
  #
  # Update info of a specific category
  def update
    @category.update! category_params
    logger.info "Category #{@category.id} is updated."
    render :show, status: :ok
  end

  ##
  # DELETE /categorie/:id
  #
  # Delete a specific category
  def destroy
    @category.destroy!
    logger.warn "Category #{@category.id} is deleted!"
    head :ok
  end

  private
  ##
  # Strict parameters
  def category_params
    params.require(:category).permit(:id, :title, :description)
  end

  ##
  # load from db
  def set_category
    @category = Category.find category_params[:id]
  end

end
