# frozen_string_literal: true

Rails.application.routes.draw do
  # Have to put this first so that it doesn't get confused with books/show
  get '/books/recommended', to: 'books#recommended'
  resources :users, only: %i[show]
  # For books and authors, we can limit the necessary routes because
  # All of the data comes from OpenLibrary.
  resources :authors, only: %i[show]
  resources :books, only: %i[new create show destroy index] do
    resources :reviews
  end
  # UJS can be ridiculous sometimes, but we can use this hack.
  # Just in case UJS works, we still permit the delete method on resources.
  # It's still secure, because we added the admin verification in the controller
  get '/books/:book_id/reviews/:id/delete', to: 'reviews#destroy'
  get '/books/:id/delete', to: 'books#destroy'
  delete '/books/:book_id/reviews/:id/delete', to: 'reviews#destroy'
  delete '/books/:id/delete', to: 'books#destroy'
  root 'static#index'
  get '/about', to: 'static#about'
  get '/search', to: 'static#search'
  devise_scope :user do
    get 'signup', to: 'devise/registrations#new'
    get 'login', to: 'devise/sessions#new'
    delete 'logout', to: 'devise/sessions#destroy'
  end
  devise_for :users, path: '/', path_names: { sign_in: 'login', sign_out: 'logout', registration: 'account',
                                              sign_up: 'signup' }
end
