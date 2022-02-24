class AddSearchableToAuthors < ActiveRecord::Migration[6.1]
  def up
    execute <<-SQL
      ALTER TABLE authors
      ADD COLUMN searchable tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(bio,'')), 'B') ||
        setweight(to_tsvector('english', coalesce(birth_date,'')), 'C')
      ) STORED;
    SQL
  end

  def down
    remove_column :books, :searchable
  end
end
