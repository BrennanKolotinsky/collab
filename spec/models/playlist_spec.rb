require 'rails_helper'

RSpec.describe Playlist, type: :model do
  describe '#user' do
    it 'is valid with a user' do
      user = create(:user)
      playlist = create(:playlist, user: user)
      expect(playlist.valid?).to eq(true)
    end

    it 'is not valid without a user' do
      expect { create(:playlist) }.to raise_error(ActiveRecord::RecordInvalid)
    end
  end

  describe '#videos' do
    it 'has videos' do
      user = create(:user)
      playlist = create(:playlist, user: user)
      video = create(:video, playlist: playlist)
      expect(playlist.videos).to eq([video])
    end
  end

  describe '#name' do
    it 'is not valid without a name' do
      user = create(:user)
      playlist = create(:playlist, user: user)
      playlist.update(name: nil)
      expect(playlist.valid?).to eq(false)
    end
  end
end
