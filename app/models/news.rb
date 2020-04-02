require 'net/http'

class News < ActiveRecord::Base

  ##
  # setting a custom primary key because
  # we opted string to the type of id.
  self.primary_key = :id

  ##
  # ActiveRecord associatoins
  belongs_to :agency_feed

  ##
  # ActiveRecord validations
  validates_presence_of :id,
                        :title,
                        :description,
                        :url,
                        :publish_date,
                        :created_at,
                        :updated_at,
                        :click_count,
                        :agency_feed_id

  ##
  # Delegation of property
  delegate :category_title, to: :agency_feed, prefix: false
  delegate :agency_name, to: :agency_feed, prefix: false

  ##
  # function to retireve all the news of 
  # a specific agency_feed
  # param :agency_feed => ActiveRecord::Model
  def self.fetch_news(agency_feed) 
    fetched_news = []
    uri = URI(agency_feed.url)
    logger.info "Fetching from #{agency_feed.url} for category #{agency_feed.category_title}."
    begin
      xml_body_str = Net::HTTP.get(uri)
      # parse the given xml body which returns Feedjira::Parser::RSSEntry
      xml_parsed_feed = Feedjira.parse xml_body_str
      logger.info "Fetched RSS feeds. Got #{xml_parsed_feed.entries.count} feeds."
      sanitizer = ActionView::Base.full_sanitizer
      xml_parsed_feed.entries.each do |rss_feed_entry|
        ## Fetching all the required param necessary for building news.
        title = sanitizer.sanitize rss_feed_entry.title
        description = sanitizer.sanitize rss_feed_entry.summary
        news_params = { id: rss_feed_entry.id,
                        title: title,
                        description: description,
                        publish_date: rss_feed_entry.published,
                        url: rss_feed_entry.url,
                        click_count: 0,
                        agency_feed_id: agency_feed.id,
                        created_at: rss_feed_entry.published,
                        updated_at: rss_feed_entry.last_modified }

        ## create and push the news
        fetched_news << (News.new news_params)
      end
    rescue Exception => e
      logger.error e.message
      return nil
    end
    return fetched_news
  end

  ##
  # function to retrieve all the news of 
  # a specific agency_feed and storing into db.
  # param :agency_feed => ActiveRecord::Model
  def self.fetch_and_store_news(agency_feed)
    unless agency_feed.new_record?
      ##
      # do not allow to store news from an agency_feed 
      # which itself is not stored.
      fetched_data = self.fetch_news agency_feed
      fetched_data.each do |news|
        begin
          news.save! if news.new_record?
        rescue Exception => e
          logger.error e.message
        end
      end
    else
      logger.error "Given agency_feed is a not saved, consider saving that first!"
    end
  end
end
