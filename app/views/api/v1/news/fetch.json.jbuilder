##
## This jbuilder view is only for the response of news#fetch action

##
# response grouped by categories.
json.array! @fetched do |fetch|
  #
  # Cateogry information
  json.id fetch[:category_id]
  json.title fetch[:category_title]

  ##
  # all the fetched news of the corresponding category.
  json.news do
    json.array! fetch[:news], partial: 'api/v1/news/news', as: :news
  end
end
