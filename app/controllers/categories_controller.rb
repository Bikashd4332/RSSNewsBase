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
    @categories = Category.all

    render :index, status: :ok
  end

  ##
  # POST /categories
  #
  # Create a news category
  def create
    @category = Category.new category_params

    if @category.save?
      logger.info "New category #{@category.name} is saved."
      redirect_to :index, status: :created
    else
      render json: { errors: @category.errors }, status: :bad_request
    end
  end

  ##
  # PUT/PATCH /categories/:id
  #
  # Update info of a specific category
  def update
    if @category.update category_params
      logger.info "Category #{@category.id} is updated."
      render :show, status: :ok
    else
      render json: { errors: @category.errors }, status: :bad_request
    end
  end

  ##
  # DELETE /categorie/:id
  #
  # Delete a specific category
  def destroy
    if @category.destroy
      logger.warn "Category #{@category.id} is deleted!"
      head :ok
    else
      head :bad_request
    end
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
    @category = Category.find_by category_params[:id]
  end

end
