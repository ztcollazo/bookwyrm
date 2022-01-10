# frozen_string_literal: true

# Controller for authors
class AuthorsController < ApplicationController
  def show
    @author = Author.find(params[:id])
  end
end
