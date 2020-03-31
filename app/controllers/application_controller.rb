class ApplicationController < ActionController::API
  include JWT::Auth::Authentication
  
  rescue_from JWT::Auth::UnauthorizedError, with: :handle_unauthorized

  before_action :validate_token

  protected
  def handle_unauthorized
    render json: { completed: false, error: "Unauthorized reqeust!" }, status: 403
  end

end
