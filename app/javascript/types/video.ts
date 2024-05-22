export type Video = {
    id: number;
    title: string;
    video_id: string;
    views: number;
    likes: number;
    comments: number;
    description: string;
    thumbnail_url: string;
    created_at: string;
    updated_at: string;
};

export type VideoAPI = {
    videos: Video[];
    meta: {
        page: number;
        total: number;
    };
};

export const emptyVideoResponse: VideoAPI = {
    videos: [],
    meta: {
        page: 0,
        total: 0,
    },
};
