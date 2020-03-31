Rails.application.routes.draw do
  ##
  # Issue refresh tokens on user authenticatoin
  post '/tokens', to: 'tokens#create'
  ##
  # Issue access tokens on refresh token 
  # Also used to refresh access token
  put '/tokens', to: 'tokens#update'

  ##
  # GET, PUT, POST, PATCH, DELETE for categories
  resources :categories
end
