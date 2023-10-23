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

    get 'items/index'
    post 'items/create'
    put 'items/update'
    delete 'items/destroy/:id', to: 'items#destroy'
    
    get 'users/index'
    put 'users/update'
    get 'users/show'
  end
  
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
