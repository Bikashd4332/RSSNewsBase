json.extract! agency, :id, :name, :logo_path, :created_at, :updated_at
json.selected UsersAgency.where(agency_id: agency.id).exists?
