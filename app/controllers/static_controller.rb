# frozen_string_literal: true

# Static pages controller
class StaticController < ApplicationController
  def index
    @random = ''
    @random = Book.find(Book.pluck(:id).sample) if Book.exists?(1) # Make sure that there are books in db
  end

  def about; end
end
