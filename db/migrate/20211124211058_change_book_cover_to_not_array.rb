class ChangeBookCoverToNotArray < ActiveRecord::Migration[6.1]
  def change
    rename_column :books, :covers, :cover
    change_column :books, :cover, :string, array: false
  end
end
