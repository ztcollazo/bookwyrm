# == Schema Information
#
# Table name: reviews
#
#  id         :bigint           not null, primary key
#  content    :text
#  rating     :bigint
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  book_id    :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_reviews_on_book_id              (book_id)
#  index_reviews_on_book_id_and_user_id  (book_id,user_id) UNIQUE
#  index_reviews_on_user_id              (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (book_id => books.id)
#  fk_rails_...  (user_id => users.id)
#
require "test_helper"

class ReviewTest < ActiveSupport::TestCase
  def setup
    @review = reviews(:one)
  end

  test "Review requires title" do
    @review.title = ''
    assert_not @review.valid?
  end

  test "Review requires content" do
    @review.content = ''
    assert_not @review.valid?
  end

  test "Review requires rating" do
    @review.rating = nil
    assert_not @review.valid?
  end

  test "Review requires book" do
    @review.book_id = nil
    assert_not @review.valid?
  end

  test "Review requires user" do
    @review.user_id = nil
    assert_not @review.valid?
  end
end
