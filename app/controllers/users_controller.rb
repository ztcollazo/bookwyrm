# frozen_string_literal: true

# The users controller
class UsersController < ApplicationController
  def show
    user = User.find_by_username(params[:id])
    if user
      @user = user
    else
      redirect_to user_path(User.find(params[:id]).username)
    end
  end
end
