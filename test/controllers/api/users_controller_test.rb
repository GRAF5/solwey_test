require "test_helper"

class Api::UsersControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test "should get users" do
    get "/api/users/index"
    expected = User.all
    res = JSON.parse response.body
    assert_equal res, expected.as_json
    assert_response :success
  end

  test "should return forbidden without current_user" do
    put "/api/users/update"
    assert_response :forbidden
  end

  test "should return forbidden user try update another account without admin rights" do
    sign_in users(:user)
    user_params = {
      id: users(:user1).id,
      firstName: "New name",
      lastName: "New name"
    }
    put "/api/users/update", params: {user: user_params}
    assert_response :forbidden
  end

  test "should update self without role" do
    sign_in users(:user)
    user_params = {
      firstName: "New name",
      lastName: "New name",
      role: "admin"
    }
    put "/api/users/update", params: {user: user_params}
    assert_equal(user_params[:firstName], users(:user).firstName)
    assert_equal(user_params[:lastName], users(:user).lastName)
    assert_equal("user", users(:user).role)
    assert_response :success
  end

  test "should not update with blank firstName" do
    sign_in users(:user)
    user_params = {
      firstName: "",
      lastName: "New name"
    }
    put "/api/users/update", params: {user: user_params}
    assert_not_equal(user_params[:firstName], users(:user).firstName)
    assert_not_equal(user_params[:lastName], users(:user).lastName)
    assert_response :unprocessable_entity
  end

  test "should not update with blank lastName" do
    sign_in users(:user)
    user_params = {
      firstName: "New name",
      lastName: ""
    }
    put "/api/users/update", params: {user: user_params}
    assert_not_equal(user_params[:firstName], users(:user).firstName)
    assert_not_equal(user_params[:lastName], users(:user).lastName)
    assert_response :unprocessable_entity
  end

  test "should update another account if current have admin rights" do
    sign_in users(:admin)
    user_params = {
      id: users(:user).id,
      firstName: "New name",
      lastName: "New name"
    }
    put "/api/users/update", params: {user: user_params}
    assert_equal(user_params[:firstName], User.where(id: users(:user).id).first.firstName)
    assert_equal(user_params[:lastName], User.where(id: users(:user).id).first.lastName)
    assert_response :success
  end

  test "should update account role if current have admin rights" do
    sign_in users(:admin)
    user_params = {
      id: users(:user).id,
      role: "admin"
    }
    put "/api/users/update", params: {user: user_params}
    assert_equal("admin", User.where(id: users(:user).id).first.role)
    assert_response :success
  end
end
