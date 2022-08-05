# frozen_string_literal: true

# The users controller
class UsersController < ApplicationController
  def show
    user = User.find_by(username: params[:id])
    if user
      @user = user
      @reviews = @user.reviews.paginate(page: params[:page], per_page: 3)
    else
      redirect_to user_path(User.find(params[:id]).username)
    end
  end
end
