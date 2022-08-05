# frozen_string_literal: true

require 'rails_helper'

RSpec.describe BooksController, type: :controller do
  let :user do
    user = build(:user)
    user.confirm
    user
  end

  let(:book) { create(:book) }

  describe 'GET #index' do
    context 'when not logged in' do
      before { get :index }

      it { is_expected.to redirect_to login_path }
    end

    context 'when logged in' do
      before do
        sign_in user
        get :index
      end

      it { is_expected.to respond_with :success }
    end
  end

  describe 'GET #new' do
    context 'when not logged in' do
      before { get :new }

      it { is_expected.to redirect_to login_path }
    end

    context 'when logged in' do
      before do
        sign_in user
        get :new
      end

      it { is_expected.to respond_with :success }
    end
  end

  describe 'GET #recommended' do
    context 'when not logged in' do
      before { get :recommended }

      it { is_expected.to redirect_to login_path }
    end

    context 'when logged in' do
      before do
        sign_in user
        get :recommended
      end

      it { is_expected.to respond_with :success }
    end
  end

  describe 'GET #show' do
    context 'when ID given' do
      before { get :show, params: { id: book.id } }

      it { is_expected.to redirect_to book_path(book.isbn_13) }
    end

    context 'when ISBN given' do
      before { get :show, params: { id: book.isbn_13 } }

      it { is_expected.to respond_with :success }
    end
  end
end
