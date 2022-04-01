# frozen_string_literal: true

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
