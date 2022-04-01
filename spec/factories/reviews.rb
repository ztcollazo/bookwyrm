# frozen_string_literal: true

FactoryBot.define do
  factory :review do
    title { Faker::Lorem.words(number: 3) }
    content { Faker::Lorem.paragraph(sentence_count: 5) }
    rating { Faker::Number.between(from: 1, to: 5) }
    association :user
    association :book
  end
end
