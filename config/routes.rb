Rails.application.routes.draw do
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
  resources :users
end
