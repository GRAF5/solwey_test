class Api::ItemsController < ApplicationController
  before_action :set_item, only: %i[destroy update]

  LIMIT = 10

  def index
    if params[:filter]
      item = Item.where("name = #{params[:filter]}")
      render json: item
    elsif params[:ids]
      item = Item.where(id: params[:ids])
      render json: item
    else
      page = (params[:page] || 1).to_i
      item = Item.all.order(created_at: :desc).limit(LIMIT).offset((page - 1) * LIMIT)
      render json: item
    end
  end

  def pages
    render json: {totalPages: (Item.select(:id).count.to_f / LIMIT).ceil}
  end

  def create
    if current_user.nil? || current_user.role != "admin"
      render json: {
        status: { 
          code: 403, message: "Can't update item"
        }
      }, status: :forbidden
    else
      item = Item.create(item_params)
      if item.valid?
        render json: item
      else
        render json: {
          message: "#{item.errors.full_messages.to_sentence}"
        }, status: :unprocessable_entity
      end
    end
  end
  
  def update
    if current_user.nil? || current_user.role != "admin"
      render json: {
        status: { 
          code: 403, message: "Can't update item"
        }
      }, status: :forbidden
    else
      if !@item 
        render json: {
          status: { 
            code: 404, message: "Can't find item to update"
          }
        }, status: :not_found
      end
      if @item.update(item_params)
        render json: {
            status: { 
              code: 200, message: "Successfuly updated item",
              data: { item: @item }
            }
          }, status: :ok
      else
        render json: {
          message: "#{@item.errors.full_messages.to_sentence}"
        }, status: :unprocessable_entity
      end
    end
  end

  def destroy
    if current_user.nil? || current_user.role != "admin"
      render json: {
        status: { 
          code: 403, message: "Can't update item"
        }
      }, status: :forbidden
    else
      @item&.destroy
      render json: { message: 'Item removed' }
    end
  end

  def set_item
    @item = Item.find(params[:id])
  end

  private 

  def item_params
    params.permit(:name, :description, :price)
  end
end
