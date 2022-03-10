# frozen_string_literal: true

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
class Book < ApplicationRecord
  include PgSearch::Model
  has_and_belongs_to_many :authors
  has_many :reviews, dependent: :destroy
  validates :title, presence: true
  validates :olid, presence: true
  validates :isbn_13, presence: true
  validates :isbn_10, presence: true
  validate :has_authors?
  pg_search_scope :search_books, against: { title: 'A', isbn_13: 'B', subtitle: 'C', description: 'D' },
                                 using: { tsearch: { dictionary: 'english', tsvector_column: 'searchable' } }

  private

  # rubocop:disable Naming/PredicateName
  def has_authors?
    # rubocop:enable Naming/PredicateName
    errors.add(:base, 'Book requires at least one author') if authors.blank?
  end
end
