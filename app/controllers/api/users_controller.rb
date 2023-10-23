class Api::UsersController < ApplicationController

  LIMIT = 10

  def index
    page = (params[:page] || 1).to_i
    user = User.all.order(created_at: :desc).limit(LIMIT).offset((page - 1) * LIMIT)
    render json: user
  end

  def pages
    render json: {totalPages: (User.select(:id).count.to_f / LIMIT).ceil}
  end

  def update
    if current_user.nil?
      render json: {
        status: { 
          code: 403, message: "Can't update user"
        }
      }, status: :forbidden
    elsif params[:user][:id] && current_user.id != params[:user][:id].to_i && current_user.role != "admin"
      render json: {
        status: { 
          code: 403, message: "Can't update user"
        }
      }, status: :forbidden
    else
      user = params[:user][:id] ? User.find(params[:user][:id]) : current_user
      if current_user.role == "admin"
        @params = user_update_admin_params
      else
        @params = user_update_params
      end
      if user.update(@params)
        render json: {
        status: { 
          code: 200, message: "Successfuly updated user",
          data: { user: UserSerializer.new(user).serializable_hash[:data][:attributes] }
          }
        }, status: :ok
      else
        user.reload
        render json: {
          message: "#{user.errors.full_messages.to_sentence}"
        }, status: :unprocessable_entity
      end
    end
  end
  
  private

  def set_user
    @user = User.find(params[:id])
  end
  
  def user_update_params
    params.require(:user).permit(:firstName, :lastName)
  end

  def user_update_admin_params
    params.require(:user).permit(:firstName, :lastName, :role)
  end
end
