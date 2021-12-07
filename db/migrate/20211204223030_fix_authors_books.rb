class FixAuthorsBooks < ActiveRecord::Migration[6.1]
  def change
    drop_table :authors_books
    create_table :authors_books do |t|
      t.belongs_to :book
      t.belongs_to :author
    end
  end
end
