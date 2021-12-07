class AddSubtitleToBooks < ActiveRecord::Migration[6.1]
  def change
    add_column :books, :subtitle, :string
  end
end
