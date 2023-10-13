require "test_helper"

class Api::OrdersDescriptionsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_orders_descriptions_index_url
    assert_response :success
  end
end
