# frozen_string_literal: true

# Book model, from openlibrary
class Book < ApplicationRecord
  has_and_belongs_to_many :authors
  validates :title, presence: true
  validates :olid, presence: true
  validates :isbn_13, presence: true
  validates :isbn_10, presence: true
  validate :has_authors?

  private

  # rubocop:disable Naming/PredicateName
  def has_authors?
    # rubocop:enable Naming/PredicateName
    errors.add(:base, 'Book requires at least one author') if authors.blank?
  end
end
