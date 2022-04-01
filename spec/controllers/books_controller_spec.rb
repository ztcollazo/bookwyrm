# frozen_string_literal: true

require 'rails_helper'

RSpec.describe BooksController, type: :controller do
  setup do
    @user = build(:user)
    @user.confirm
    @book = create(:book)
  end

  describe 'GET #index' do
    context 'not logged in' do
      before { get :index }

      it 'redirects to login' do
        should use_before_action :authenticate_user!
        should redirect_to login_path
      end
    end

    context 'logged in' do
      before do
        sign_in @user
        get :index
      end

      it do
        should respond_with :success
        should render_template :index
      end
    end
  end

  describe 'GET #new' do
    context 'not logged in' do
      before { get :new }

      it 'redirects to login' do
        should use_before_action :authenticate_user!
        should redirect_to login_path
      end
    end

    context 'logged in' do
      before do
        sign_in @user
        get :new
      end

      it 'renders successfully' do
        should respond_with :success
        should render_template :new
      end
    end
  end

  describe 'GET #recommended' do
    context 'not logged in' do
      before { get :recommended }

      it 'redirects to login' do
        should use_before_action :authenticate_user!
        should redirect_to login_path
      end
    end

    context 'logged in' do
      before do
        sign_in @user
        get :recommended
      end

      it 'renders successfully' do
        should respond_with :success
        should render_template :recommended
      end
    end
  end

  describe 'GET #show' do
    context 'id given' do
      before { get :show, params: { id: @book.id } }

      it { should redirect_to book_path(@book.isbn_13) }
    end

    context 'isbn given' do
      before { get :show, params: { id: @book.isbn_13 } }

      it 'renders successfully' do
        should respond_with :success
        should render_template :show
      end
    end
  end
end
