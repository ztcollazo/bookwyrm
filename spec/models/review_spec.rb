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
require 'rails_helper'

RSpec.describe Review, type: :model do
  subject { create(:review) }

  context 'validations' do
    it { should be_valid }
    it { should validate_presence_of :title }
    it { should validate_presence_of :rating }
    it { should validate_presence_of :content }
  end

  context 'relationships' do
    it { should belong_to :book }
    it { should belong_to :user }
  end
end
