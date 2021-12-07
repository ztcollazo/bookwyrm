class CreateBookAuthor < ActiveRecord::Migration[6.1]
  def change
    create_table :book_authors do |t|
      t.belongs_to :book
      t.belongs_to :author
    end
  end
end
