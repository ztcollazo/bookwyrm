# frozen_string_literal: true

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
