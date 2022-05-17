# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AuthorsController, type: :controller do
  describe 'GET #show' do
    before { get :show, params: { id: create(:author).id } }
    it { should respond_with :success }
    it { should render_template :show }
  end
end
