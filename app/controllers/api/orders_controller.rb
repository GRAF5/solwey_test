class Api::OrdersController < ApplicationController
  def index
    user = current_user
    if user.nil?
      head :forbidden
    else
      item = Order.where(user_id: user.id)
      render json: item
    end
  end

  def create
    user = current_user
    if user.nil?
      head :forbidden
    else
      amount = 0
      items = JSON.parse(params[:order][:items])
      items.each do |item|
        item_doc = Item.find(item['id'])
        amount += item['count'] * item_doc.price
      end
      if items.length == 0 
        head :bad_request
      else
        order = Order.create!(user: user, amount: amount)
        if order
          items.each do |item|
            item_doc = Item.find(item['id'])
            OrdersDescription.create!(item: item_doc, order: order, quantity: item['count'])
          end
          render json: order
        else
          render json: order.errors
        end
      end
    end
  end
end