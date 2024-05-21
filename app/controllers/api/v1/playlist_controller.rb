class Api::V1::PlaylistController < ApplicationController
  def index
    playlists = Playlist.where(user: current_user)
    render json: playlists
  end

  def create
    playlist = Playlist.create!(playlist_params.merge(user: current_user))
  end

  private

  def playlist_params
    params.permit(:name)
  end
end
