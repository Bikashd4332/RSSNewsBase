json.array! @categories, partial: 'api/v1/categories/category', as: :category, locals: { current_user: current_user }
