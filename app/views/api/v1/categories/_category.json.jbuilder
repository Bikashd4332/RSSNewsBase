json.extract! category, :id, :name, :icon, :created_at, :updated_at
json.selected UsersCategory.where(category_id: category.id).exists?
