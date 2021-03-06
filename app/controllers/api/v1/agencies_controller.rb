class Api::V1::AgenciesController < ApplicationController

  ##
  # JWT ValidationsJWT Validations
  before_action :require_token, only: [:update, :destroy]

  # require access token before action
  before_action :validate_access_token, only: [:update, :destroy]

  # set agency_feed before action
  before_action :set_agency, only: [:update, :destroy]

  ##
  # GET /agencies.json
  def index
    @agencies = Agency.all
    render :index , status: :ok, locals:{ current_user: current_user }
  end

  ##
  # GET /agencies/:id.json
  def show
    render :show, status: :ok
  end

  ##
  # POST /agencies.json
  def create
    @agency = Agency.new agency_params

    ## logo_path <#ActionDispact >
    @agency.logo_path = agency_params[:logo_path]
    @agency.save!
    render :show, status: :created
  end

  ##
  # DELETE /agencies/:id.json
  def destroy
    @agency.destroy!
    head :ok
  end

  private
  def set_agency
    @agency = Agency.find params[:id]
  end

  def agency_params
    params.require(:agency).permit(:id, :name, :logo_path, :created_at, :updated_at)
  end
end
