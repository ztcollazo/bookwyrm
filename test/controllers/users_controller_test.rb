require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get user_url(users(:one).username)
    assert_response :success
  end

  test "should redirect for id to username" do
    get user_url(users(:one))
    assert_redirected_to user_url(users(:one).username)
  end
end
