class ChangeBookPublishDateToTimestamp < ActiveRecord::Migration[6.1]
  def change
    remove_column :books, :publish_date
    add_column :books, :publish_date, :timestamp
  end
end
