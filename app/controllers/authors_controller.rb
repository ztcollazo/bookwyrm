# frozen_string_literal: true

# Controller for authors
class AuthorsController < ApplicationController
  def show
    @author = Author.find(params[:id])
    @books = @author.books.paginate(page: params[:page], per_page: 3)
  end
end
