class RenameBookAuthorsToAuthorsBooks < ActiveRecord::Migration[6.1]
  def change
    drop_table :book_authors
    create_table :authors_books do |t|
      t.belongs_to :books
      t.belongs_to :authors
    end
  end
end
