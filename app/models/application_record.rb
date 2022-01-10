# frozen_string_literal: true

# Base Application class
class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
end
