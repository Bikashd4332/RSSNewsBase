json.partial! @news, partial: 'news/news', as: :news

json.category do
  json.id news.category_id
  json.title news.category_title
end

json.provider do
  json.id news.agency_id
  json.name news.agency_name
end
