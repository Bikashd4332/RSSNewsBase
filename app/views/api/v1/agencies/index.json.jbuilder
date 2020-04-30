json.array! @agencies, partial: "api/v1/agencies/agency", as: :agency, locals: { current_user: current_user }
