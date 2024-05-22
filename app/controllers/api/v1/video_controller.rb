class Api::V1::VideoController < ApplicationController
  def index
    page = params[:page] || '1'
    
    response = HTTParty.get('https://mock-youtube-api-f3d0c17f0e38.herokuapp.com/api/videos?page=' + page)
    render json: response
  end
end
