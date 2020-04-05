require 'net/http'

module Errors
  module ErrorHandler
    extend ActiveSupport::Concern

    included do
      ##
      # Mapping of all the origin error classes to domain handlers.
      ERRORS = {
        ActionController::RoutingError => 'Errors::NotFoundError',
        ActiveRecord::RecordNotFound => 'Errors::NotFoundError',
        ActiveRecord::RecordInvalid => 'Errors::RecordInvalidError',
        JWT::Auth::UnauthorizedError => 'Errors::UnauthorizedError',
        Net::HTTPClientError => 'Errors::NewsFetchError',
        Net::HTTPServerError => 'Errors::NewsFetchError'
      }

      ## Just listen all the errors that occurs..
      rescue_from StandardError, with: lambda {|e| handle_error(e) }

      private
      ##
      # the job is to fetch one of the mapped error class from the 
      # ERRORS and render it.
      # param :origin_error => The raised exception
      def handle_error(origin_error)
        handler = find_map(origin_error.class) || BaseError
        render_error handler, origin_error
      end

      ##
      # This is responsible for finding a mapping in ERRORS hash map.
      # param :klass => the class of the raised exception
      def find_map(klass)
        klass_name = klass.name
        ## If the thrown class is itself a mapped handeler
        return klass if ERRORS.values.include? klass_name
        ERRORS[klass].constantize if ERRORS[klass] 
      end

      ##
      # This is a render function which helps to render the exception
      # with message and status.
      def render_error(handler, origin_error)
        render_handler = handler.new origin_error
        render json: render_handler.to_json, status: render_handler.status
      end
    end
  end
end
