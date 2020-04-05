module Errors
  ##
  # For unauthenticated actions
  class UnauthorizedError < Errors::BaseError

    def initialize(error)
      super(error,
            status: 401,
            message: "The action you invoked requires you to login, please login first!")
    end

  end
end
