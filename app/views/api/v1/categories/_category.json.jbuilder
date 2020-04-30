json.extract! category, :id, :name, :icon, :created_at, :updated_at
if defined? current_user
  json.selected UsersCategory.where(user_id: current_user.id, category_id: category.id).exists?
end
