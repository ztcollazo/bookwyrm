# frozen_string_literal: true

# == Schema Information
#
# Table name: authors
#
#  id         :bigint           not null, primary key
#  bio        :text
#  birth_date :string
#  links      :json             is an Array
#  name       :string
#  olid       :string
#  photos     :bigint           default([]), is an Array
#  searchable :tsvector
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_authors_on_olid        (olid) UNIQUE
#  index_authors_on_searchable  (searchable) USING gin
#
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
