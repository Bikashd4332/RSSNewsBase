json.extract! agency, :id, :name, :logo_path, :created_at, :updated_at
if defined? current_user
  json.selected UsersAgency.where(user_id: current_user.id, agency_id: agency.id).exists?
end
