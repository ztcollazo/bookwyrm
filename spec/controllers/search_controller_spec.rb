# frozen_string_literal: true

RSpec.describe SearchController, type: :controller do
  describe 'GET #index' do
    context 'empty search' do
      before { get :index }

      it { should redirect_to request.referrer || root_path }
    end

    context 'valid search' do
      before { get :index, params: { q: 'search' } }

      it 'should render successfully' do
        should respond_with :success
        should render_template :index
      end
    end
  end

  describe 'GET #authors' do
    context 'empty search' do
      before { get :authors }

      it { should redirect_to request.referrer || root_path }
    end

    context 'valid search' do
      before { get :authors, params: { q: 'search' } }

      it 'should render successfully' do
        should respond_with :success
        should render_template :authors
      end
    end
  end

  describe 'GET #books' do
    context 'empty search' do
      before { get :books }

      it { should redirect_to request.referrer || root_path }
    end

    context 'valid search' do
      before { get :books, params: { q: 'search' } }

      it 'should render successfully' do
        should respond_with :success
        should render_template :books
      end
    end
  end
end
