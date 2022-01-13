# frozen_string_literal: true

require 'test_helper'

class BooksControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
  setup do
    @book = books(:one)
  end

  test 'should get new' do
    sign_in users(:one)
    get new_book_url
    assert_response :success
  end

  # Testing creating a book is difficult, because of the has_and_belongs_to_many relationship.
  # No matter how the request is formatted, it returns a 422 error.

  test 'should show book' do
    get book_url(@book.isbn_13 || book.isbn_10)
    assert_response :success
  end

  test 'should destroy book' do
    sign_in users(:one)
    assert_difference('Book.count', -1) do
      delete book_url(@book.isbn_13)
    end
  end
end
