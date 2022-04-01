# frozen_string_literal: true

# == Schema Information
#
# Table name: reviews
#
#  id         :bigint           not null, primary key
#  content    :text
#  rating     :bigint
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  book_id    :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_reviews_on_book_id              (book_id)
#  index_reviews_on_book_id_and_user_id  (book_id,user_id) UNIQUE
#  index_reviews_on_user_id              (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (book_id => books.id)
#  fk_rails_...  (user_id => users.id)
#
FactoryBot.define do
  factory :review do
    title { Faker::Lorem.words(number: 3) }
    content { Faker::Lorem.paragraph(sentence_count: 5) }
    rating { Faker::Number.between(from: 1, to: 5) }
    association :user
    association :book
  end
end
