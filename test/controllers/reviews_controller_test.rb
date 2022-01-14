# frozen_string_literal: true

require 'test_helper'

class ReviewsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @user = users(:one)
    @user.confirm
    @second_user = users(:two)
    @second_user.confirm
    @review = reviews(:one)
  end

  test "should get index" do
    get book_reviews_url(@review.book.isbn_13)
    assert_response :success
  end

  test "should get new" do
    sign_in @user
    get new_book_review_url(@review.book.isbn_13)
    assert_response :success
  end

  test "should create review" do
    sign_in @second_user
    assert_difference('Review.count') do
      post book_reviews_url(@review.book.isbn_13), params: { review: { content: 'this is a test', rating: 5, title: 'Lorem ipsum etc' } }
    end

    assert_redirected_to book_reviews_url
  end

  test "should get edit" do
    sign_in @user
    get edit_book_review_url(@review.book.isbn_13, @review)
    assert_response :success
  end

  test "should update review" do
    sign_in @user
    patch book_review_url(@review.book.isbn_13, @review), params: { review: { content: @review.content, rating: @review.rating, title: @review.title } }
    assert_redirected_to book_reviews_url(@review.book.isbn_13)
  end

  test "should destroy review" do
    sign_in @user
    id = @review.book.isbn_13
    assert_difference('Review.count', -1) do
      delete book_review_url(id, @review)
    end

    assert_redirected_to book_reviews_url(id)
  end
end
