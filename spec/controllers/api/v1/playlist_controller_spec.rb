require 'rails_helper'

RSpec.describe Api::V1::PlaylistController, type: :controller do

  describe "GET #index" do
    let!(:user_1) { create(:user) }
    let!(:user_2) { create(:user) }
    let!(:playlist_1) { create(:playlist, user: user_1) }
    let!(:playlist_2) { create(:playlist, user: user_2) }

    before { allow(controller).to receive(:current_user) { user_1 } }

    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end

    it "returns an array of playlists" do
      get :index
      expect(JSON.parse(response.body)).to eq([playlist_1.as_json])
    end
  end
end
