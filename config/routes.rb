Rails.application.routes.draw do
  namespace :api  do
    namespace :v1 do
      ##
      # Issue refresh tokens on user authenticatoin
      post '/tokens', to: 'tokens#sign_in'

      ##
      # Issue access tokens on refresh token
      # Also used to refresh access token
      put '/tokens', to: 'tokens#refresh'

      ##
      # GET, PUT, POST, PATCH, DELETE for categories
      resources :categories

      ##
      # GET, PUT, POST, PATCH, DELETE for categories
      resources :users_categories, except: [:update, :show, :new]

      ##
      # GET, PUT, POST, PATCH, DELETE for users
      resources :users, except: [:destroy, :new]

      ##
      # GET, POST, PUT/PATCH
      resources :agencyfeeds, except: [:destroy, :new] do
        member do
          get 'fetch_news'
        end
      end

      ##
      # GET, POST
      resources :news, only: [:index, :new] do
        collection do
          # accetps id in request body.
          post 'show'
          # increase the count of the news by 1 whenever hit
          post 'up_click_count'
          # fetched all the latest news from agency.
          get 'fetch'
        end
      end

      ##
      # GET
      resources :users_news, only: [:index]

      ##
      # GET, POST, DELETE, PATCH/PUT
      resources :agencies

      ##
      # GET, POST, DELETE, PATCH/PUT
      resources :users_agencies, except: [:update, :show, :new]
    end
  end

  ##
  # Forward all the requests to static controller unless its an api
  # request.
  get '/app/*s', to: 'static#index', format: false, constraint: ->(req) do
    !req.xhr? && req.format.html?
  end
  ##
  # Fallback to app root
  get '/app', to: 'static#index', format: false, constraint: ->(req) do
    !req.xhr? && req.format.html?
  end
  ##
  # Last resort
  root to: 'static#index'
end
