class MakeBookIsbnUnique < ActiveRecord::Migration[6.1]
  def change
    add_index :books, :isbn_10, unique: true
    add_index :books, :isbn_13, unique: true
  end
end
