# frozen_string_literal: true

# == Schema Information
#
# Table name: authors
#
#  id         :bigint           not null, primary key
#  bio        :text
#  birth_date :string
#  links      :json             is an Array
#  name       :string
#  olid       :string
#  photos     :bigint           default([]), is an Array
#  searchable :tsvector
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_authors_on_olid        (olid) UNIQUE
#  index_authors_on_searchable  (searchable) USING gin
#
class Author < ApplicationRecord
  include PgSearch::Model
  has_many :authors_books, dependent: :destroy
  has_many :books, through: :authors_books
  validates :name, presence: true
  validates :olid, presence: true
  pg_search_scope :search_authors, against: { name: 'A', bio: 'B', birth_date: 'C' },
                                   using: { tsearch: { dictionary: 'english', tsvector_column: 'searchable' } }
  before_destroy do
    books.each(&:destroy)
  end
end
