class Api::UsersController < ApplicationController
  before_action :set_user, only: %i[show, destroy]

  def index
    user = User.all.order(created_at: :desc)
    render json: user
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
