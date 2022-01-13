# frozen_string_literal: true

require 'test_helper'

class ReviewsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @review = reviews(:one)
  end

  test "should get index" do
    get book_reviews_url(@review.book_id)
    assert_response :success
  end

  test "should get new" do
    sign_in users(:one)
    get new_book_review_url(@review.book_id)
    assert_response :success
  end

  test "should create review" do
    sign_in users(:one)
    assert_difference('Review.count') do
      post book_reviews_url(@review.book_id), params: { review: { book_id: @review.book_id, content: @review.content, rating: @review.rating, title: @review.title, user_id: @review.user_id } }
    end

    assert_redirected_to book_reviews_url
  end

  test "should get edit" do
    sign_in users(:one)
    get edit_book_review_url(@review.book.isbn_13, @review)
    assert_response :success
  end

  test "should update review" do
    sign_in users(:one)
    patch book_review_url(@review.book.isbn_13, @review), params: { review: { book_id: @review.book_id, content: @review.content, rating: @review.rating, title: @review.title, user_id: @review.user_id } }
    assert_redirected_to book_reviews_url(@review.book.isbn_13)
  end

  test "should destroy review" do
    sign_in users(:one)
    id = @review.book_id
    assert_difference('Review.count', -1) do
      delete book_review_url(id, @review)
    end

    assert_redirected_to book_reviews_url(id)
  end
end
