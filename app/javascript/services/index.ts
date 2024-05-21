import { Playlist } from "../types/playlist";

export const getPlaylist = async (id: number): Promise<Playlist | null> => {
    const url = `/api/v1/playlist/show/${id}`;
    try {
        const response = await fetch(url);

        if (response.ok) {
            const playlist = await response.json();
            return playlist;
        } else {
            throw response;
        }
    } catch(e) {
        console.warn(e);
        return null;
    };
};

export const getPlaylists = async (): Promise<Playlist[]> => {
    const url = `/api/v1/playlist/index`;
    try {
        const response = await fetch(url);

        if (response.ok) {
            const playlists = await response.json();
            return playlists;
        } else {
            throw response;
        }
    } catch(e) {
        console.warn(e);
        return [];
    };
};