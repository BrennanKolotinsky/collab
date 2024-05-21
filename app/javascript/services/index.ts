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

export const createPlaylist = async (name: string): Promise<Boolean> => {
    const url = `/api/v1/playlist/create`;
    const body = {
        name,
    };

    try {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "X-CSRF-Token": token as string,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            return true;
        } else {
            throw response;
        }
    } catch(e) {
        console.warn(e);
        return false;
    };
};
