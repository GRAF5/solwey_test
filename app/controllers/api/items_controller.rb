class Api::ItemsController < ApplicationController
  before_action :set_item, only: %i[show, destroy]

  def index
    if params[:filter]
      item = Item.where("name = #{params[:filter]}")
      render json: item
    else
      item = Item.all.order(created_at: :desc)
      render json: item
    end
  end

  def create
    item = Item.create!(item_params)
    if item
      render json: item
    else
      render json: item.errors
    end
  end

  def show
    render json: @item
  end

  def destroy
    @item&.destroy
    render json: { message: 'Item removed' }
  end

  def set_item
    @item = Item.find(params[:id])
  end
end
