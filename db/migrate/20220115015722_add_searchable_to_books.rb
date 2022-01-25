class AddSearchableToBooks < ActiveRecord::Migration[6.1]
  def up
    execute <<-SQL
      ALTER TABLE books
      ADD COLUMN searchable tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(description,'')), 'B')
      ) STORED;
    SQL
  end

  def down
    remove_column :books, :searchable
  end
end
