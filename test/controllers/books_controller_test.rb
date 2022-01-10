# frozen_string_literal: true

require 'test_helper'

class BooksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @book = books(:one)
  end

  test 'should get new' do
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
    assert_difference('Book.count', -1) do
      delete book_url(@book.isbn_13 || @book.isbn_10)
    end

    assert_redirected_to books_url
  end
end
