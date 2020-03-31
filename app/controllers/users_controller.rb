class UsersController < ApplicationController
  ##
  # before_action JWT validation
  before_action :validate_access_token, except: :create
  before_action :require_token, except: :create

  ##
  # Initialize user on each request except create
  before_action :set_user, except: :create

  ##
  # Make sure that thereis no logged in user
  before_action :no_current_user, only: :create


  ##
  # POST /usser.json
  #
  # Create a new user with given post data
  # and store.
  def create
    byebug
    @user = User.new user_params

      unless @user.save
        render json: { errors: @user.errors }, status: :bad_request
      else
        logger.info "New User with id #{@user.id} has been saved."
        #
        # log-in the user immediately after sign-up
        # issue a refresh token with that the 
        # user will request an access token.
        set_refresh_token @user
        head :created
      end
  end


  ##
  # PATCH/PUT /user/:id.json
  #
  # update the user information
  def update
    if @user.update user_params
      logger.info "Account updation succeed! #{@user.id}."
      head :ok
    else
      render json: { error: @user.errors }, status: :bad_request
    end
  end

  private
  ##
  # param :params => request params
  #
  # Set @user with the given user id
  def set_user
    @user = current_user
  end

  ##
  # Is there any one logged in already if yes
  # prevent calling user create.
  def no_current_user
    if @user = current_user
      logger.warn "Restricting user #{@user.id} from calling create!"
      head :method_not_allowed
    end
  end

  ##
  # Restricting request params with necessary
  # values for :User.
  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :name)
  end

end
