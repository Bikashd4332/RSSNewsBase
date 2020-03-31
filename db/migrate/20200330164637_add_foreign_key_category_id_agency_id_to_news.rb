class AddForeignKeyCategoryIdAgencyIdToNews < ActiveRecord::Migration
  def change

    add_reference :news, :categories, null: false, index: true
    add_reference :news, :agencies, null: false, index: true

    add_foreign_key :news, :categories, column: :categories_id
    add_foreign_key :news, :agencies, column: :agencies_id

  end
end
