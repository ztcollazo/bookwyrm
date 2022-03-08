class IndexBooksAndAuthorsOnOlid < ActiveRecord::Migration[7.0]
  def change
    add_index :books, :olid, unique: true
    add_index :authors, :olid, unique: true
  end
end
