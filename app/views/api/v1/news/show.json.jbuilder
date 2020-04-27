json.partial! @news, partial: 'api/v1/news/news', as: :news

json.category do
  json.id news.category_id
  json.name news.category_name
end

json.provider do
  json.id news.agency_id
  json.name news.agency_name
end
