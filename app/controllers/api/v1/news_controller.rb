class Api::V1::NewsController < ApplicationController

  ##
  # News reducer for filtering based on query param.
  NewsReducer = Rack::Reducer.new(
    News.all,
    ->(category:) { joins(:agency_feed).where('agency_feeds.category_id = ?', category)},
    ->(agency:) { joins(:agency_feed).where('agency_feeds.agency_id = ?', agency)},
    ->(find:) { where("title LIKE ? OR description LIKE ?", "%#{find}%", "%#{find}%")},
    ->(id:) { find_by_id id }
  )

  ##
  # GET /news?find=''&category=''.json
  # This action supports pagination of
  # news records.
  def index
    ##
    # This news reducer will filter news on given params.
    @news = paginate NewsReducer.apply(params), per_page: 10
    render :index, status: :ok
  end

  ##
  # POST /news/:id
  #
  def show
    @news = NewsReducer.apply(params)
    render :show, status: :ok
  end

  ##
  # POST /news/up_click_count
  def up_click_count
    ## Get the news
    @news = NewsReducer.apply(params)
    @news.increment! :click_count
    render json: { count: @news.click_count }, status: :ok
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

end
