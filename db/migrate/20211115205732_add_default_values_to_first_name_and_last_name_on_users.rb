class AddDefaultValuesToFirstNameAndLastNameOnUsers < ActiveRecord::Migration[6.1]
  def change
    change_column :users, :first_name, :string, default: ''
    change_column :users, :last_name, :string, default: ''
  end
end
