class Api::V1::UsersNewsController < ApplicationController
  ##
  # Token Validations
  before_action :validate_token
  before_action :validate_access_token

  ##
  # News reducer for filtering based on query param.
  NewsReducer = Rack::Reducer.new(
    News.preference_of(current_user),
    ->(category:) { where('agency_feeds.category_id=?', category.id) },
    ->(agency:) { where('agency_feeds.agency_id=?', agency.id) },
    ->(find:) { where("news.title LIKE ? OR news.description LIKE ?", "%#{find}%", "%#{find}%")},
    ->(id:) { find_by_id id}
  )

  ##
  # GET /users_news.json?find=''&category=''.json
  # This action supports pagination of
  # news records.
  def index
    ##
    # This news reducer will filter news on given params.
    @news = paginate NewsReducer.apply(params), per_page: 10
    render :index, status: :ok
  end
end
