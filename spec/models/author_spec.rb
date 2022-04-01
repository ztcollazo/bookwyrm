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
