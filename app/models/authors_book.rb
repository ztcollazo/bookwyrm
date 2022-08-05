# frozen_string_literal: true

# == Schema Information
#
# Table name: authors_books
#
#  id        :bigint           not null, primary key
#  author_id :bigint
#  book_id   :bigint
#
# Indexes
#
#  index_authors_books_on_author_id  (author_id)
#  index_authors_books_on_book_id    (book_id)
#
class AuthorsBook < ApplicationRecord
  belongs_to :author
  belongs_to :book
end
