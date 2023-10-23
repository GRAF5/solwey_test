require "test_helper"

class Api::OrdersDescriptionsControllerTest < ActionDispatch::IntegrationTest
  test "should get order_descriptions" do
    id = orders_descriptions(:one).id
    get "/api/orders_descriptions/index?orderId=#{id}"
    expected = OrdersDescription.where(order_id: id)
    res = JSON.parse response.body
    assert_equal res, expected.as_json
    assert_response :success
  end
end
