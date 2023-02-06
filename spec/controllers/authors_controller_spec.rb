# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AuthorsController do
  describe 'GET #show' do
    before { get :show, params: { id: create(:author).id } }

    it { is_expected.to respond_with :success }
    it { is_expected.to render_template :show }
  end
end
