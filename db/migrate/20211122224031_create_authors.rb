class CreateAuthors < ActiveRecord::Migration[6.1]
  def change
    create_table :authors do |t|
      t.string :name
      t.string :olid
      t.text :bio
      t.string :birth_date
      t.json :links, array: true, default: []
      t.bigint :photos, array: true, default: []

      t.timestamps
    end
  end
end
