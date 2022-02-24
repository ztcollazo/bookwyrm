# frozen_string_literal: true

# Static pages controller
class StaticController < ApplicationController
  def index
    bin = File.binread('tmp/recommender.bin')
    # rubocop:disable Security/MarshalLoad
    recommender = Marshal.load(bin)
    # rubocop:enable Security/MarshalLoad
    @books = Book.find(recommender.top_items(count: 2).map { |i| i[:item_id] })
  rescue StandardError
    @books = Book.includes(:reviews).order('reviews.rating ASC').limit(2)
  end

  def about; end
end
