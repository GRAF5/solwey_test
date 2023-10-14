# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  before_action :configure_permitted_parameters, :only => [:create]

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up) do |user_params|
      user_params.permit(:firstName, :lastName, :email, :password)
    end
  end

  private

  def respond_with(current_user, _opts = {})
    if current_user.persisted?
      render json: {
        status: {code: 200, message: 'Signed up successfully.'},
        data: UserSerializer.new(current_user).serializable_hash[:data][:attributes]
      }, status: :ok
    else
      render json: {
        message: "#{current_user.errors.full_messages.to_sentence}"
      }, status: :unprocessable_entity
    end
  end
end
