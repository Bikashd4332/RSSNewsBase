module Errors
  ##
  # Error thrown when unable to fetch news from RSS Providers.
  class NewsFetchError < Errors::BaseError

    def initialize(error)
      super(error, status: 500)
    end

  end
end
