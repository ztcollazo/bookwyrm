class CreateBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :books do |t|
      # Publishers, authors in has_and_belongs_to_many
      t.bigint :isbn_10
      t.bigint :isbn_13
      t.bigint :covers, array: true, default: []
      t.string :title
      t.json :identifiers
      t.string :publish_date
      t.string :olid
      t.text :description

      t.timestamps
    end
  end
end
