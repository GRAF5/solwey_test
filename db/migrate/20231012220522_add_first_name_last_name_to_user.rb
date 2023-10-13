class AddFirstNameLastNameToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :firstName, :string, null: false, default: ''
    add_column :users, :lastName, :string, null: false, default: ''
    add_column :users, :role, :integer, default: 0
  end
end
