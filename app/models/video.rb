class Video < ApplicationRecord
    validates :thumbnail_url, presence: true
    validates :title, presence: true
    validates :views, presence: true
end
