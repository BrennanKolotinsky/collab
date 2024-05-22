require 'rails_helper'

RSpec.describe Api::V1::VideoController, type: :controller do

  describe "GET #index" do

    it "returns http success" do
      get :index, params: { page: 1 }
      expect(response).to have_http_status(:success)
    end

    it "returns an array of video information" do
      get :index, params: { page: 1 }
      expect(JSON.parse(response.body)["videos"][0]["id"]).to eq(1)
    end
  end
end
