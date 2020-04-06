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
          # fetched all the latest news from agency.
          get 'fetch'
        end
      end

      ##
      # GET, POST, DELETE, PATCH/PUT
      resources :agencies
    end
  end

  ##
  # Forward all the requests to static controller unless its an api
  # request.
  get '*page', to: 'static#index', constraint: ->(req) do
    !req.xhr? && req.format.html?
  end
  root to: 'static#index'
end
