# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  subject { create(:user) }

  context 'validations' do
    it { should be_valid }
    it { should validate_presence_of :username }
    it { should validate_presence_of :email }
    it { should validate_presence_of :first_name }
    it { should validate_presence_of :last_name }
  end

  context 'relationships' do
    it { should have_many :reviews }
  end
end
