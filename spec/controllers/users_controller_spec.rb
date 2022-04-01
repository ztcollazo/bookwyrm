# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe 'GET #show' do
    setup do
      @user = create(:user)
      @user.confirm
    end

    context 'id given' do
      before { get :show, params: { id: @user.id } }

      it { should redirect_to user_path(@user.username) }
    end

    context 'username given' do
      before { get :show, params: { id: @user.username } }

      it 'renders successfully' do
        should respond_with :success
        should render_template :show
      end
    end
  end
end
