class ApplicationController < ActionController::API
  include JWT::Auth::Authentication
  
  ##
  # handle critical exceptions by sending imformative response.
  rescue_from JWT::Auth::UnauthorizedError, with: :handle_unauthorized
  rescue_from ActionController::RoutingError, with: :handle_route_error

  ##
  # validate the intergity of token if found.
  before_action :validate_token

  protected

  def handle_unauthorized
    render json: { error: "Unauthorized reqeust!" }, status: :forbidden
  end

  def handle_route_error
    render json: { error: "Endpoint not found!" }, status: :not_found
  end

end
