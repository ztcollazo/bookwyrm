# frozen_string_literal: true

# The model for authors
class Author < ApplicationRecord
  has_and_belongs_to_many :books
  validates :name, presence: true
  validates :olid, presence: true
  before_destroy do
    books.each(&:destroy)
  end
end
