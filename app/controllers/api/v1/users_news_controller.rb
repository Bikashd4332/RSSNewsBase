class Api::V1::UsersNewsController < ApplicationController
  ##
  # Token Validations
  before_action :validate_token
  before_action :validate_access_token

  ##
  # GET /users_news.json?find=''&category=''.json
  # This action supports pagination of
  # news records.
  def index
    ##
    # This news reducer will filter news on given params.
    @news = paginate Rack::Reducer.call(params, dataset: News.preferrence_of(current_user), filters: [
      ->(category:) { where('agency_feeds.category_id=?', category) },
      ->(agency:) { where('agency_feeds.agency_id=?', agency) },
      ->(find:) { where("news.title LIKE ? OR news.description LIKE ?", "%#{find}%", "%#{find}%")},
      ->(id:) { find_by_id id}
    ]), per_page: 10
    render template: 'api/v1/news/index', status: :ok
  end
end
