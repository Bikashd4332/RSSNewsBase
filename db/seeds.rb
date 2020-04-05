##
# First dependency : Categories
# Which categories the system tracks to fetch news for
#
categories = [
  { title: :Tech, description: "News on latest technology and gadgests"},
  { title: :Sports, description: "Stay upto date with news on sports."},
  { title: :Motosport, description: "Motos GP races."},
]

categories.each do |category|
  Category.create category
end


##
# Second dependency: Agencies
agencies = [
  {name: "Times Of India"},
  {name: "Hindustan Times"},
  {name: "The Hindu"},
]

agencies.each do |agency|
  Agency.create agency
end

##
# Third is to setup AgencyFeeds
agency_feeds = [
  { url: 'https://timesofindia.indiatimes.com/rssfeeds/4719148.cms', agency_id: Agency.first.id, category_id: Category.first.id },
  { url: 'https://www.hindustantimes.com/rss/sports/rssfeed.xml', agency_id: Agency.second.id, category_id: Category.second.id },
  { url: 'https://www.thehindu.com/sport/motorsport/feeder/default.rss', agency_id: Agency.third.id, category_id: Category.third.id }
]

agency_feeds.each do |af|
  AgencyFeed.create af
end

##
# Setting News up now
AgencyFeed.all.each do |af|
  News.fetch_and_store_news af
end
