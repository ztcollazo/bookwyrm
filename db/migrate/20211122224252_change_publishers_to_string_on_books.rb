class ChangePublishersToStringOnBooks < ActiveRecord::Migration[6.1]
  def change
    add_column :books, :publishers, :string, array: true, default: []
  end
end
