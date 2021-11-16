# frozen_string_literal: true

Rails.application.routes.draw do
  root 'static#index'
  get '/about', to: 'static#about'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  devise_scope :user do
    get 'signup', to: 'devise/registrations#new'
    get 'login', to: 'devise/sessions#new'
    delete 'logout', to: 'devise/sessions#destroy'
  end
  devise_for :users, path: '/', path_names: { sign_in: 'login', sign_out: 'logout', registration: 'account',
                                              sign_up: 'signup' }
end
