class AddPlaylistToVideo < ActiveRecord::Migration[7.0]
  def change
    add_reference :videos, :playlist, null: false, foreign_key: true
  end
end
