class Api::OrdersDescriptionsController < ApplicationController
  def index
    if params[:orderId]
      orders_description = OrdersDescription
        .where("order_id = #{params[:orderId]}")
      render json: orders_description.to_json(include: :item)
    else
      render json: { message: 'Order Not Found' }
    end
  end
end
