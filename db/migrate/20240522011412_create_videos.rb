class CreateVideos < ActiveRecord::Migration[7.0]
  def up
    create_table :videos do |t|
      t.string :thumbnail_url, presence: true
      t.string :title, presence: true
      t.string :description
      t.integer :views, presence: true

      t.timestamps
    end
  end

  def down
    drop_table :videos
  end
end
