# frozen_string_literal: true

# The model for authors
class Author < ApplicationRecord
  include PgSearch::Model
  has_and_belongs_to_many :books
  validates :name, presence: true
  validates :olid, presence: true
  pg_search_scope :search_authors, against: { name: 'A', bio: 'B', birth_date: 'C' },
                                   using: { tsearch: { dictionary: 'english', tsvector_column: 'searchable' } }
  before_destroy do
    books.each(&:destroy)
  end
end
