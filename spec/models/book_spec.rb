# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Book, type: :model do
  subject { create(:book) }

  context 'validations' do
    it { should be_valid }
    it { should validate_presence_of :title }
    it { should validate_presence_of :isbn_13 }
    it { should validate_presence_of :isbn_10 }
    it { should validate_presence_of :olid }
    it { should have_multiple :authors }
  end

  context 'relationships' do
    it { should have_and_belong_to_many :authors }
    it { should be_searchable on: %w[title description subtitle isbn_13], name: 'search_books' }
  end
end
