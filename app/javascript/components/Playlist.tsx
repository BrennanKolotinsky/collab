import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylist } from '../services';
import { Playlist } from '../types/playlist';
import { Video } from '../types/video';
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
            <table className="mx-auto">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Thumbnail</th>
                        <th>Title</th>
                        <th className='w-50'>Description</th>
                        <th>View Count</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        playlist.videos?.map((video: Partial<Video>) => {
                            return <tr key={video.id} className="mt-4">
                                <td>{video.id}</td>
                                <td><img src={video.thumbnail_url} alt="video thumbnail" width="150" height="150" /> </td>
                                <td>{video.title}</td>
                                <td>{video.description?.substring(0, 100)}{video.description && video.description?.length >= 100 ? '...' : ''}</td>
                                <td>{video.views}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <div className='d-flex justify-content-center'>
                <Link to='/' className='btn btn-lg custom-button mt-2'>Navigate Home</Link>
            </div>
        </div>
    );
};