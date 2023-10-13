Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'api/login',
    sign_out: 'api/logout',
    registration: 'api/signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  namespace :api do
    get 'orders_descriptions/index'
    
    get 'orders/index'
    post 'orders/create'
    get 'orders/show'

    get 'items/index'
    post 'items/create'
    get 'items/show'
    delete 'items/destroy'
    
    get 'users/index'
    get 'users/show'
    delete 'users/destroy'
  end
  
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
