# frozen_string_literal: true

# Job that updates recommendations for all users, can be called on review creation or periodically
class UpdateRecommendationsJob < ApplicationJob
  queue_as :default

  def perform(*_args)
    recommender = Disco::Recommender.new(top_items: true)
    recommender.fit(format_reviews)

    users = User.confirmed.joins(:reviews).where.not(id: nil)
    users.each do |user|
      user.update_recommended_books(recommender.user_recs(user.id))
    end
    json = recommender.to_json
    File.write('tmp/recommender.json', json)
  end

  private

  def format_reviews
    Review.all.map do |review|
      { item_id: review.book_id,
        rating: review.rating, user_id: review.user_id }
    end
  end
end
