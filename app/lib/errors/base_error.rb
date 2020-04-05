module Errors
  class BaseError < ::StandardError
    attr_reader :error, :status

    def initialize (error, status: nil, message: nil)
      @message = message || error.message
      @status = status || 500
    end

    def to_json
      { message: @message,
        status: @status }.to_json
    end
  end
end
