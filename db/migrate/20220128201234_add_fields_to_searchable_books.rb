class AddFieldsToSearchableBooks < ActiveRecord::Migration[6.1]
  def change
    execute <<-SQL
      ALTER TABLE books DROP COLUMN searchable;
      ALTER TABLE books
      ADD COLUMN searchable tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(cast(isbn_13 as varchar(255)), '')), 'B') ||
        setweight(to_tsvector('english', coalesce(subtitle, '')), 'C') ||
        setweight(to_tsvector('english', coalesce(description,'')), 'D')
      ) STORED;
    SQL
  end
end
