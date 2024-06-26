import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylist } from '../services';
import { Playlist } from '../types/playlist';
import { Video } from '../types/video';
import PlaylistTable from './PlaylistTable';
import { Link } from 'react-router-dom';

export default (): JSX.Element => {

    const { id } = useParams();
    const [playlist, setPlaylist] = useState<Playlist | null>();

    useEffect(() => {
        const fetchPlaylist = async (): Promise<void> => {
            const playlist = await getPlaylist(Number(id));
            setPlaylist(playlist);
        };

        fetchPlaylist();
    }, []);

    if (!playlist) {
        return <></>;
    }

    return(
        <div>
            <h2 className='text-center'>Playlist: {playlist.name}</h2>
            <PlaylistTable videos={playlist.videos as Partial<Video>[]} addVideoToPlaylist={() => null} />
            <div className='d-flex justify-content-center'>
                <Link to='/' className='btn btn-lg custom-button mt-2'>Navigate Home</Link>
            </div>
        </div>
    );
};