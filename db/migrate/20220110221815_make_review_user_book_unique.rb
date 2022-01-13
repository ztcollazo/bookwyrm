class MakeReviewUserBookUnique < ActiveRecord::Migration[6.1]
  def change
    add_index :reviews, %i[book_id user_id], unique: true
  end
end
