json.extract! category, :id, :name, :icon, :created_at, :updated_at
if defined? current_user and !current_user.nil?
  json.selected UsersCategory.where(user_id: current_user.id, category_id: category.id).exists?
end
