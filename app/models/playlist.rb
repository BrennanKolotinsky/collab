class Playlist < ApplicationRecord
  belongs_to :user
  has_many :videos, dependent: :destroy

  validates :name, presence: true
  accepts_nested_attributes_for :videos
end
