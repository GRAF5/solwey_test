class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[firstName lastName])
    devise_parameter_sanitizer.permit(:account_update, keys: %i[firstName lastName])
  end
end
