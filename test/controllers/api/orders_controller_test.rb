require "test_helper"

class Api::OrdersControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test "should return forbidden to not loginned user" do
    get "/api/orders/index"
    assert_response :forbidden
  end

  test "should return orders for user" do
    sign_in users(:user)
    expected = Order.where(user_id: users(:user).id)
    get "/api/orders/index"
    res = JSON.parse response.body
    assert_equal res, expected.as_json
    assert_response :success
  end

  test "should return bad_request on create without items" do
    sign_in users(:user)
    order_params = {
      items: JSON.generate([])
    }
    post "/api/orders/create", params: {order: order_params}
    assert_response :bad_request
  end

  test "should create order with order_descriptions" do
    sign_in users(:user)
    old_len = Order.where(user_id: users(:user).id).count
    order_params = {
      items: JSON.generate([{id: items(:one).id, count: 2}])
    }
    post "/api/orders/create", params: {order: order_params}
    assert_equal old_len + 1, Order.where(user_id: users(:user).id).count
    assert_equal Order.last.amount, items(:one).price * 2
    assert_not_empty OrdersDescription.where(order_id: Order.last.id)
  end
end
