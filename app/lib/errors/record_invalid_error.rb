module Errors
  class RecordInvalidError < Errors::BaseError

    def initialize(errors)
      ## Unprocessable Entity
      @errors = errors || {}
      @status = 422
    end

    def serialize_errors
      error_details = @errors.record.errors.messages.reduce([]) do |r, (title, messages)|
       r << { field: title, message: messages }
      end

      error_hash = {
        meassage: "Input[s] given for creating record is invalid. Please recheck!",
        status: @status,
        details: error_details
      }
    end

    def to_json
      self.serialize_errors.to_json
    end

  end
end
