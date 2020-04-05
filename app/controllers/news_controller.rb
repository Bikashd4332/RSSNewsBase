class NewsController < ApplicationController

  #
  # validate token on action
  before_action :require_token

  # Verify access token before action
  before_action :validate_access_token

  # before action :show set news
  before_action :set_news, only: :show


  ##
  # GET /news.json
  # This action supports pagination of 
  # news records.
  def index
    @news = News.all
    ##
    # Api paginate helper function which helps to
    # paginate records.
    paginate json: @news, per_page: 20
  end

  ##
  # POST /news/:id
  #
  def show
    ## just render the content
    render :show, status: :ok
  end

  ##
  # GET /fetch.json
  #
  # Fetch news of all category and update news base.
  def fetch
    ##
    # an array of { category_id: number, news: array }
    @fetched = News.fetch_and_store_news_from_all_agency_feed!
    render  :fetch, status: :ok
  end

  private
  ##
  # Set @news before actions
  def set_news
    @news = News.find_by_id! params[:id]
  end
end
