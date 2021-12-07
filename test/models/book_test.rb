require 'test_helper'

class BookTest < ActiveSupport::TestCase
  def setup
    @book = books(:one)
    @author = authors(:one)
    @book.authors << @author
  end

  test 'book should be valid' do
    assert @book.valid?
  end

  test 'book requires title' do
    @book.title = ''
    assert_not @book.valid?
  end

  test 'book requires olid' do
    @book.olid = ''
    assert_not @book.valid?
  end

  test 'book requires isbn_13' do
    @book.isbn_13 = nil
    assert_not @book.valid?
  end

  test 'book requires isbn_10' do
    @book.isbn_10 = nil
    assert_not @book.valid?
  end

  test 'book requires authors' do
    @book.authors = []
    assert_not @book.valid?
  end
end
