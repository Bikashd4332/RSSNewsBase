class AgencyfeedsController < ApplicationController

  ##
  # JWT ValidationsJWT Validations
  before_action :require_token

  # require access token before action
  before_action :validate_access_token

  # set agency_feed before action
  before_action :set_agencyfeed, only: [:update, :destroy, :show, :fetch_news]

  ##
  # GET /agencyfeed.json
  #
  # Get all the agency feed available
  def index
    @agencyfeeds = AgencyFeed.all

    render :index, status: :ok
  end

  ##
  # GET /agencyfeeds/:id.json
  def show
    render :show, status: :ok
  end

  ##
  # POST /agencyfeed.json
  #
  # Create agency with params
  def create
    @agencyfeed = AgencyFeed.create! agencyfeed_params
    render :show, status: :created
  end

  ##
  # PUT/PATCH agencyfeed.json
  #
  # update the configuration of agency and category
  def update
    @agencyfeed.update! agencyfeed_params
    render :show, status: :ok
  end

  ##
  # GET /agencyfeed/:id/fetch_news.json
  #
  # fetch all the news and update db for a specific agencyfeed.
  def fetch_news
    @news = News.fetch_and_store_news! @agencyfeed
    render template: 'news/list', status: :ok
  end
  
  def set_agencyfeed
    @agencyfeed = AgencyFeed.find params[:id]
  end

  def agencyfeed_params
    params.require(:agencyfeed).permit(:id, :url, :created_at, :updated_at, :category_id, :agency_id)
  end

end
