class CreateOrdersDescriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :orders_descriptions do |t|
      t.integer :quantity
      t.references :item, foreign_key: true
      t.references :order, foreign_key: true

      t.timestamps
    end
  end
end
