# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ErrorsController, type: :controller do
  describe 'GET #not_found' do
    before { get :not_found }

    it { is_expected.to respond_with :missing }
  end

  describe 'GET #internal_server_error' do
    before { get :internal_server_error }

    it { is_expected.to respond_with :error }
  end
end
