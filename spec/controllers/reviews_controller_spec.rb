# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ReviewsController, type: :controller do
  setup do
    @user = build(:user)
    @user.confirm
    @book = create(:book)
    @review = create(:review, user: @user, book: @book)
  end

  describe 'GET #index' do
    before do
      sign_in @user
      get :index, params: { book_id: @book.isbn_13 }
    end

    it do
      should respond_with :success
    end
  end

  describe 'GET #new' do
    context 'not logged in' do
      before { get :new, params: { book_id: @book.isbn_13 } }

      it 'redirects to login' do
        should use_before_action :authenticate_user!
        should redirect_to login_path
      end
    end

    context 'logged in' do
      before do
        sign_in @user
        get :new, params: { book_id: @book.isbn_13 }
      end

      it 'renders successfully' do
        should respond_with :success
      end
    end
  end

  describe 'GET #edit' do
    context 'not logged in' do
      before { get :edit, params: { book_id: @book.isbn_13, id: @review.id } }

      it 'redirects to login' do
        should use_before_action :authenticate_user!
        should redirect_to login_path
      end
    end

    context 'incorrect user' do
      before do
        user = create(:user)
        user.confirm
        sign_in user
        get :edit, params: { book_id: @book.isbn_13, id: @review.id }
      end

      it { should redirect_to book_reviews_path(@book.isbn_13) }
    end

    context 'correct user' do
      before do
        sign_in @user
        get :edit, params: { book_id: @book.isbn_13, id: @review.id }
      end

      it 'renders successfully' do
        should respond_with :success
      end
    end
  end
end
