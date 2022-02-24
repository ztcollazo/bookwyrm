require 'test_helper'

class SearchControllerTest < ActionDispatch::IntegrationTest
  def setup
    @book = books(:one)
    @author = authors(:one)
    @book.authors << @author
  end

  test 'should get index' do
    get search_url(q: @book.title)
    assert_response :success
  end

  test 'should get books' do
    get search_books_url(q: @book.title)
    assert_response :success
  end

  test 'should get authors' do
    get search_authors_url(q: @author.name)
    assert_response :success
  end

  test 'index should search books and authors' do
    get search_url(q: @book.title)
    assert_select '#books'
    assert_select '#authors'
  end

  test 'books should have results' do
    get search_books_url(q: @book.title)
    assert_select '#results' do
      assert_select '.book'
    end
  end

  test 'authors should have results' do
    get search_authors_url(q: @author.name)
    assert_select '#results' do
      assert_select '.author'
    end
  end

  test 'search should redirect on empty' do
    get search_url
    assert_redirected_to root_url
  end
end
