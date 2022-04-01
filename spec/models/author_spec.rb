# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Author, type: :model do
  subject { create(:author) }

  context 'validations' do
    it { should be_valid }
    it { should validate_presence_of :name }
    it { should validate_presence_of :olid }
  end

  context 'relationships' do
    it { should have_and_belong_to_many :books }
    it { should be_searchable on: %w[name bio birth_date], name: 'search_authors' }
  end
end
