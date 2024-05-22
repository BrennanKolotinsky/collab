import { Video } from './video';

export type Playlist = {
    id: number,
    name: string,
    user_id?: number,
    created_at?: string,
    updated_at?: string,
    video_count?: number,
    videos?: Partial<Video>[],
};
