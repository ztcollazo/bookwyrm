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
FactoryBot.define do
  factory :book do
    title { Faker::Book.title }
    subtitle { Faker::Lorem.words(number: 3) }
    isbn_13 { Faker::Number.number(digits: 13) }
    isbn_10 { Faker::Number.number(digits: 10) }
    cover { Faker::Number.number(digits: 7) }
    olid { "OL#{Faker::Number.number(digits: 5)}W" }
    description { Faker::Lorem.paragraph(sentence_count: 5) }
    publishers { [Faker::Book.publisher] }
    publish_date { Faker::Date.new }
    identifiers { { goodreads: Faker::Number.number(digits: 7) } }
    authors { [association(:author)] }
  end
end
