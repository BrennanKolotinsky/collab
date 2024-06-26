class PlaylistSerializer < ActiveModel::Serializer
    attributes :id, :name, :video_count, :videos

    def video_count
        object.videos&.count || 0
    end
end
