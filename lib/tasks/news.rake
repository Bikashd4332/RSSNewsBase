namespace :news do
  desc "This task will fetch and update databse with newly added news of all categories."
  task fetch: :environment do
    begin
      News.fetch_and_store_news_from_all_agency_feed!
    rescue => exception
      puts "Cant be able to fetch due to #{exception}."
    end
  end
end
