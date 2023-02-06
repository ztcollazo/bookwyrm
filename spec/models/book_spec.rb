# frozen_string_literal: true

# == Schema Information
#
# Table name: books
#
#  id           :bigint           not null, primary key
#  cover        :string           default("{}")
#  description  :text
#  identifiers  :json
#  isbn_10      :bigint
#  isbn_13      :bigint
#  olid         :string
#  publish_date :datetime
#  publishers   :string           default([]), is an Array
#  searchable   :tsvector
#  subtitle     :string
#  title        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_books_on_isbn_10  (isbn_10) UNIQUE
#  index_books_on_isbn_13  (isbn_13) UNIQUE
#  index_books_on_olid     (olid) UNIQUE
#
require 'rails_helper'

RSpec.describe Book do
  subject { create(:book) }

  describe 'validations' do
    it { is_expected.to be_valid }
    it { is_expected.to validate_presence_of :title }
    it { is_expected.to validate_presence_of :isbn_13 }
    it { is_expected.to validate_presence_of :isbn_10 }
    it { is_expected.to validate_presence_of :olid }
    it { is_expected.to have_multiple :authors }
  end

  describe 'relationships' do
    it { is_expected.to have_many :authors }
    it { is_expected.to be_searchable on: %w[title description subtitle isbn_13], name: 'search_books' }
  end
end
