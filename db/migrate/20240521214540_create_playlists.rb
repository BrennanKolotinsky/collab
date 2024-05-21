class CreatePlaylists < ActiveRecord::Migration[7.0]
  def up
    create_table :playlists do |t|
      t.string :name, presence: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end

  def down
    drop_table :playlists
  end
end
