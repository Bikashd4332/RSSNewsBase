class Api::V1::CategoriesController < ApplicationController
  # Require token for protected actions
  before_action :require_token, only: [:update, :destroy]

  # Validate access token on all actions
  before_action :validate_access_token, only: [:update, :destroy]

  # Set @category on action call
  before_action :set_category, only: [:update, :destroy, :show]

  ##
  # GET /categories
  #
  # List all the categories present in the categories
  # table
  def index
    @categories = Category.all
    render :index , status: :ok, locals:{ current_user: current_user }
  end

  ##
  # POST /categories
  #
  # Create a news category
  def create
    @category = Category.new category_params

    ## logo_path <#ActionDispact >
    @category.icon = category_params[:icon]
    @category.save!
    render :show, status: :created
  end

  ##
  # GET /categories/:id
  def show
    render :show, status: :ok
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
    params.require(:category).permit(:id, :name, :description, :icon)
  end

  ##
  # load from db
  def set_category
    @category = Category.find params[:id]
  end

end
