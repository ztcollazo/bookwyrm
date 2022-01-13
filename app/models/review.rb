# frozen_string_literal: true

class Review < ApplicationRecord
  belongs_to :user
  belongs_to :book

  validates :user, presence: true, uniqueness: { scope: :book }
  validates :book, presence: true
  validates :title, presence: true
  validates :rating, presence: true
  validates :content, presence: true
end
