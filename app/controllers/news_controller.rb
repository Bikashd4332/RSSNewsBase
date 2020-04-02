class NewsController < ApplicationController

  ##
  # validate token on action
  before_action :require_token

  # Verify access token before action
  before_action :validate_access_token


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
  # GET /news/:id
  #
  def show
    @news = News.find_by parms[:id]

    render :show, status: :ok
  end
end
