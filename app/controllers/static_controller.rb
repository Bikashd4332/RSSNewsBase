##
# An empty controller class for the purpose of serving 
# react app to the client.
class StaticController < ApplicationController
  def index
    render :index
  end
end
