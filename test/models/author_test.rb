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
require "test_helper"

class AuthorTest < ActiveSupport::TestCase
  def setup
    @author = authors(:one)
  end

  test 'author should be valid' do
    assert @author.valid?
  end

  test 'author requires name' do
    @author.name = ''
    assert_not @author.valid?
  end

  test 'author requires olid' do
    @author.olid = ''
    assert_not @author.valid?
  end

  test 'author should be searchable' do
    assert Author.search_authors(@author.name).include? @author
  end
end
