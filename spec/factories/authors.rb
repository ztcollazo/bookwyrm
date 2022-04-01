# frozen_string_literal: true

FactoryBot.define do
  factory :author do
    name { Faker::Name.name }
    bio { Faker::Lorem.paragraph(sentence_count: 10) }
    olid { "OL#{Faker::Number.number(digits: 5)}A" }
    birth_date { Faker::Date.birthday }
    links { [{ name: 'Wikipedia', url: 'https://en.wikipedia.org/Some_Author' }] }
    photos { [Faker::Number.number(digits: 7)] }
  end
end
