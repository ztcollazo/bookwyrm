# frozen_string_literal: true

# Book model, from openlibrary
class Book < ApplicationRecord
  include PgSearch::Model
  has_and_belongs_to_many :authors
  has_many :reviews, dependent: :destroy
  validates :title, presence: true
  validates :olid, presence: true
  validates :isbn_13, presence: true
  validates :isbn_10, presence: true
  validate :has_authors?
  pg_search_scope :search_books, against: { title: 'A', description: 'B', publishers: 'C' },
                                 using: { tsearch: { dictionary: 'english', tsvector_column: 'searchable' } }

  private

  # rubocop:disable Naming/PredicateName
  def has_authors?
    # rubocop:enable Naming/PredicateName
    errors.add(:base, 'Book requires at least one author') if authors.blank?
  end
end
