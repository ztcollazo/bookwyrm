# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ReviewsController do
  let! :user do
    user = build(:user)
    user.confirm
    user
  end

  let!(:book) { create(:book) }

  let(:review) { create(:review, user: user, book: book) }

  describe 'GET #index' do
    before do
      sign_in user
      get :index, params: { book_id: book.isbn_13 }
    end

    it { is_expected.to respond_with :success }
  end

  describe 'GET #new' do
    context 'when not logged in' do
      before { get :new, params: { book_id: book.isbn_13 } }

      it { is_expected.to redirect_to login_path }
    end

    context 'when logged in' do
      before do
        sign_in user
        get :new, params: { book_id: book.isbn_13 }
      end

      it { is_expected.to respond_with :success }
    end
  end

  describe 'GET #edit' do
    context 'when not logged in' do
      before { get :edit, params: { book_id: book.isbn_13, id: review.id } }

      it { is_expected.to redirect_to login_path }
    end

    context 'when incorrect user' do
      before do
        u = create(:user)
        u.confirm
        sign_in u
        get :edit, params: { book_id: book.isbn_13, id: review.id }
      end

      it { is_expected.to redirect_to book_reviews_path(book.isbn_13) }
    end

    context 'when correct user' do
      before do
        sign_in user
        get :edit, params: { book_id: book.isbn_13, id: review.id }
      end

      it { is_expected.to respond_with :success }
    end
  end
end
