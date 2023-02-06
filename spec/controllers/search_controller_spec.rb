# frozen_string_literal: true

RSpec.describe SearchController do
  describe 'GET #index' do
    context 'when empty search' do
      before { get :index }

      it { is_expected.to redirect_to request.referer || root_path }
    end

    context 'when valid search' do
      before { get :index, params: { q: 'search' } }

      it { is_expected.to respond_with :success }
    end
  end

  describe 'GET #authors' do
    context 'when empty search' do
      before { get :authors }

      it { is_expected.to redirect_to request.referer || root_path }
    end

    context 'when valid search' do
      before { get :authors, params: { q: 'search' } }

      it { is_expected.to respond_with :success }
    end
  end

  describe 'GET #books' do
    context 'when empty search' do
      before { get :books }

      it { is_expected.to redirect_to request.referer || root_path }
    end

    context 'when valid search' do
      before { get :books, params: { q: 'search' } }

      it { is_expected.to respond_with :success }
    end
  end
end
