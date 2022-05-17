# frozen_string_literal: true

RSpec.describe StaticController, type: :controller do
  describe 'GET #index' do
    before { get :index }

    it 'should render successfully' do
      should respond_with :success
      should render_template :index
    end
  end

  describe 'GET #about' do
    before { get :about }

    it 'should render successfully' do
      should respond_with :success
      should render_template :about
    end
  end
end
