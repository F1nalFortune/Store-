class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.float :price
      t.string :name
      t.string :quantity
      t.string :description

      t.timestamps null: false
    end
  end
end
