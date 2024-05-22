require 'rails_helper'

RSpec.describe Video, type: :model do
  let(:user) { create(:user) }
  let(:playlist) { create(:playlist, user: user) }

  describe '#description' do
    it 'is valid even without a description' do
      video = create(:video, playlist: playlist)
      video.update(description: nil)
      expect(video.valid?).to eq(true)
    end
  end

  describe '#title' do
    it 'is not valid without a title' do
      video = create(:video, playlist: playlist)
      video.update(title: nil)
      expect(video.valid?).to eq(false)
    end
  end
  
  describe '#thumbnail_url' do
    it 'is not valid without a thumbnail_url' do
      video = create(:video, playlist: playlist)
      video.update(thumbnail_url: nil)
      expect(video.valid?).to eq(false)
    end
  end

  describe '#views' do
    it 'is not valid without views' do
      video = create(:video, playlist: playlist)
      video.update(views: nil)
      expect(video.valid?).to eq(false)
    end
  end

  describe '#playlist' do
    it 'is not valid without a playlist' do
      video = create(:video, playlist: playlist)
      video.update(playlist: nil)
      expect(video.valid?).to eq(false)
    end
  end
end
