Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'video/index/:page', to: 'video#index'

      get 'playlist/index'
      post 'playlist/create'
      get 'playlist/show/:id', to: 'playlist#show'
    end
  end
  devise_for :users
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
