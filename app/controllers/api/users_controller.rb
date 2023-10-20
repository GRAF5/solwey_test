class Api::UsersController < ApplicationController
  before_action :set_user, only: %i[show, destroy]

  def index
    user = User.all.order(created_at: :desc)
    render json: user
  end

  def update
    if current_user.id != params[:user][:id].to_i && current_user.role != "admin"
      render json: {
        status: { 
          code: 403, message: "Can't update user"
        }
      }, status: :forbidden
    else
      user = params[:user][:id] != nil ? User.find(params[:user][:id]) : current_user
      if params[:user][:firstName]
        user.firstName = params[:user][:firstName]
      end
      if params[:user][:lastName]
        user.lastName = params[:user][:lastName]
      end
      if params[:user][:role] && current_user.role == "admin"
        user.role = params[:user][:role]
      end
      user.save
      render json: {
          status: { 
            code: 200, message: "Successfuly updated user",
            data: { user: UserSerializer.new(user).serializable_hash[:data][:attributes] }
          }
        }, status: :ok
    end
  end

  def show
    render json: @user
  end

  def destroy
    @user&.destroy
    render json: { message: 'User deleted' }
  end
  
  def set_user
    @user = User.find(params[:id])
  end
end
