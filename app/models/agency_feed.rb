class AgencyFeed < ActiveRecord::Base
  belongs_to :categories
  belongs_to :agencies
end
