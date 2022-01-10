# frozen_string_literal: true

require 'test_helper'

class StaticControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get root_url
    assert_response :success
  end

  test 'should get about' do
    get about_url
    assert_response :success
  end
end
