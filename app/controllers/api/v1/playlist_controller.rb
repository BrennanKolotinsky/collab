class Api::V1::PlaylistController < ApplicationController
  before_action :set_playlist, only: [:show]

  def index
    playlists = Playlist.where(user: current_user)
    render json: playlists
  end

  def show
    render json: @playlist
  end

  def create
    playlist = Playlist.create!(playlist_params.merge(user: current_user))
    render json: playlist
  end

  private

  def set_playlist
    @playlist = Playlist.find(params[:id])
  end

  def playlist_params
    params.permit(:name, videos_attributes: [:title, :description, :thumbnail_url, :views])
  end
end
