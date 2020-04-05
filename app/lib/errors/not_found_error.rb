module Errors
  ##
  # For non-existing routes or resources
  class NotFoundError < Errors::BaseError
    def initialize(error)
      super(error, status: 404)
    end
  end
end
