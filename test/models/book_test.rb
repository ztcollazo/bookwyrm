# == Schema Information
#
# Table name: books
#
#  id           :bigint           not null, primary key
#  cover        :string           default("{}")
#  description  :text
#  identifiers  :json
#  isbn_10      :bigint
#  isbn_13      :bigint
#  olid         :string
#  publish_date :datetime
#  publishers   :string           default([]), is an Array
#  searchable   :tsvector
#  subtitle     :string
#  title        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_books_on_isbn_10  (isbn_10) UNIQUE
#  index_books_on_isbn_13  (isbn_13) UNIQUE
#  index_books_on_olid     (olid) UNIQUE
#
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

  test 'book should be searchable' do
    assert Book.search_books(@book.title).include? @book
  end
end
