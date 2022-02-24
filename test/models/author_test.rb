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
