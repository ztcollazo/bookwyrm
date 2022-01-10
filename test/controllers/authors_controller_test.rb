# frozen_string_literal: true

require 'test_helper'

class AuthorsControllerTest < ActionDispatch::IntegrationTest
  test 'author page should be viewable' do
    get author_url(authors(:one))
    assert_response :success
  end
end
