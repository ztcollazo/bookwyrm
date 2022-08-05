# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe 'GET #show' do
    let :user do
      user = create(:user)
      user.confirm
      user
    end

    context 'when ID given' do
      before { get :show, params: { id: user.id } }

      it { is_expected.to redirect_to user_path(user.username) }
    end

    context 'when username given' do
      before { get :show, params: { id: user.username } }

      it { is_expected.to respond_with :success }
    end
  end
end
