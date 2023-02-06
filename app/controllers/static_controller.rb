# frozen_string_literal: true

# Static pages controller
class StaticController < ApplicationController
  def index
    json = File.read('tmp/recommender.json')
    recommender = Disco::Recommender.load_json(json)
    @books = Book.find(recommender.top_items(count: 2).pluck(:item_id))
  rescue StandardError
    @books = Book.includes(:reviews).order('reviews.rating').limit(2)
  end

  def about; end
end
