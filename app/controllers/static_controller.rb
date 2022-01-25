# frozen_string_literal: true

# Static pages controller
class StaticController < ApplicationController
  def index; end

  def about; end

  def search
    @results = Book.search_books(params[:q])
  end
end
