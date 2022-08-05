# frozen_string_literal: true

RSpec.describe StaticController, type: :controller do
  describe 'GET #index' do
    before { get :index }

    it { is_expected.to respond_with :success }
  end

  describe 'GET #about' do
    before { get :about }

    it { is_expected.to respond_with :success }
  end
end
