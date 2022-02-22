namespace :recommendations do
  desc 'Update recommendations for all users, based on the update_recommendations job'
  task update: :environment do
    UpdateRecommendationsJob.perform_now
  end

end
