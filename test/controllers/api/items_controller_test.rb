require "test_helper"

class Api::ItemsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test "should get items on call" do
    get "/api/items/index"
    expected = Item.all
    res = JSON.parse response.body
    assert_equal res, expected.as_json
  end

  test "should get filtered item" do
    get "/api/items/index?filter='Item1'"
    expected = Item.where(name: "Item1")
    res = JSON.parse response.body
    assert_equal res, expected.as_json
  end

  test "should get item by id" do
    id = Item.first.id
    get "/api/items/index?ids=#{id}"
    expected = Item.where(id: id)
    res = JSON.parse response.body
    assert_equal res, expected.as_json
  end

  test "should get items by ids" do
    id1 = Item.first.id
    id2 = Item.second.id
    get "/api/items/index?ids[]=#{id1}&ids[]=#{id2}"
    expected = Item.where(id: [id1, id2])
    res = JSON.parse response.body
    assert_equal res, expected.as_json
  end

  test "should return forbidden without user for create request" do
    post "/api/items/create"
    assert_response :forbidden
  end

  test "should return forbidden for not admin user for create request" do
    sign_in users(:user)
    post "/api/items/create"
    assert_response :forbidden
  end

  test "should create item" do 
    sign_in users(:admin)
    item_params = {
      name: "New Item",
      description: "Description",
      price: 12.12
    }
    post "/api/items/create", params: item_params
    assert_not_empty Item.where(item_params)
    assert_response :success
  end

  test "should not create item with blank name" do
    sign_in users(:admin)
    item_params = {
      name: "",
      description: "Description",
      price: 12.12
    }
    post "/api/items/create", params: item_params
    assert_empty Item.where(item_params)
    assert_response :unprocessable_entity
  end

  test "should not create item with blank description" do
    sign_in users(:admin)
    item_params = {
      name: "New Item",
      description: "",
      price: 12.12
    }
    post "/api/items/create", params: item_params
    assert_empty Item.where(item_params)
    assert_response :unprocessable_entity
  end

  test "should not create item with negative price" do
    sign_in users(:admin)
    item_params = {
      name: "New Item",
      description: "Description",
      price: -1
    }
    post "/api/items/create", params: item_params
    assert_empty Item.where(item_params)
    assert_response :unprocessable_entity
  end

  test "should not create item with zero price" do
    sign_in users(:admin)
    item_params = {
      name: "New Item",
      description: "Description",
      price: 0
    }
    post "/api/items/create", params: item_params
    assert_empty Item.where(item_params)
    assert_response :unprocessable_entity
  end

  test "should return forbidden without user for update request" do
    id = Item.first.id
    put "/api/items/update", params: {id: id}
    assert_response :forbidden
  end

  test "should return forbidden for not admin user for update request" do
    id = Item.first.id
    sign_in users(:user)
    put "/api/items/update", params: {id: id}
    assert_response :forbidden
  end

  test "update should return not found for non existent id" do
    sign_in users(:admin)
    id = 1
    assert_raises ActiveRecord::RecordNotFound do
      put "/api/items/update", params: {id: id}
    end
  end
  
  test "should update item" do
    old_params = Item.first
    item_params = {
      id: old_params.id,
      name: "New Item Name",
      description: "New Item Description",
      price: old_params.price + 1
    }
    sign_in users(:admin)
    put "/api/items/update", params: item_params
    assert_equal(old_params.id, Item.first.id)
    assert_not_equal(old_params.name, Item.first.name)
    assert_not_equal(old_params.description, Item.first.description)
    assert_not_equal(old_params.price, Item.first.price)
    assert_response :success
  end
  
  test "should not update item with blank name" do
    old_params = Item.first
    item_params = {
      id: old_params.id,
      name: "",
      description: "New Item Description",
      price: old_params.price + 1
    }
    sign_in users(:admin)
    put "/api/items/update", params: item_params
    assert_equal(old_params.id, Item.first.id)
    assert_equal(old_params.name, Item.first.name)
    assert_equal(old_params.description, Item.first.description)
    assert_equal(old_params.price, Item.first.price)
    assert_response :unprocessable_entity
  end
  
  test "should not update item with blank description" do
    old_params = Item.first
    item_params = {
      id: old_params.id,
      name: "New Item name",
      description: "",
      price: old_params.price + 1
    }
    sign_in users(:admin)
    put "/api/items/update", params: item_params
    assert_equal(old_params.id, Item.first.id)
    assert_equal(old_params.name, Item.first.name)
    assert_equal(old_params.description, Item.first.description)
    assert_equal(old_params.price, Item.first.price)
    assert_response :unprocessable_entity
  end
  
  test "should not update item with zero price" do
    old_params = Item.first
    item_params = {
      id: old_params.id,
      name: "New Item name",
      description: "New Item Description",
      price: 0
    }
    sign_in users(:admin)
    put "/api/items/update", params: item_params
    assert_equal(old_params.id, Item.first.id)
    assert_equal(old_params.name, Item.first.name)
    assert_equal(old_params.description, Item.first.description)
    assert_equal(old_params.price, Item.first.price)
    assert_response :unprocessable_entity
  end
  
  test "should not update item with negative price" do
    old_params = Item.first
    item_params = {
      id: old_params.id,
      name: "New Item name",
      description: "New Item Description",
      price: -1
    }
    sign_in users(:admin)
    put "/api/items/update", params: item_params
    assert_equal(old_params.id, Item.first.id)
    assert_equal(old_params.name, Item.first.name)
    assert_equal(old_params.description, Item.first.description)
    assert_equal(old_params.price, Item.first.price)
    assert_response :unprocessable_entity
  end

  test "should return forbidden without user for delete request" do
    id = Item.first.id
    delete "/api/items/destroy/#{id}"
    assert_response :forbidden
  end

  test "should return forbidden for not admin user for delete request" do
    id = Item.first.id
    sign_in users(:user)
    delete "/api/items/destroy/#{id}"
    assert_response :forbidden
  end

  test "should return not found destroy for non existent id" do
    sign_in users(:admin)
    assert_raises ActiveRecord::RecordNotFound do
      delete "/api/items/destroy/1"
    end
  end

  test "should delete item" do
    id = Item.first.id
    sign_in users(:admin)
    delete "/api/items/destroy/#{id}"
    assert_response :success
    assert_empty Item.where(id: id)
  end
end
