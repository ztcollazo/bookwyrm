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
