# frozen_string_literal: true

# Default mailer base for the application
class ApplicationMailer < ActionMailer::Base
  default from: 'from@example.com'
  layout 'mailer'
end
