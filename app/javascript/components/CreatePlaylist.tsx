import React, { useState, useEffect } from 'react';
import { createPlaylist, getVideos } from '../services';
import { Link } from 'react-router-dom';

export default (): JSX.Element => {

    const [playlistName, setPlaylistName] = useState<string>('');
    const [videos, setVideos] = useState<any[]>([]);

    useEffect(() => {
        const fetchVideos = async (): Promise<void> => {
            const videos = await getVideos(1);
            setVideos(videos);
        };
        fetchVideos();
    }, []);

    const handleSubmit = async (): Promise<void> => {
        if (playlistName.length === 0) {
            alert('Please enter a playlist name');
            return;
        };

        const success = await createPlaylist(playlistName);
        if (success) {
            alert('Successfully created playlist');
            window.open(`/`); 
        } else {
            alert('Failed to create playlist!');
        };
    };

    return(
        <div className='margin-left-large mt-4'>
            <h2>Create Playlist</h2>
            <div className="d-flex align-items-center mt-4">
                <label>Playlist:</label>
                <input type='text' placeholder='My first playlist' className='margin-left-small' onChange={(e) =>  setPlaylistName(e.target.value)}></input>
            </div>
            {
                videos && (
                    <div className="d-flex align-items-center mt-4">
                        <img src="https://i.ytimg.com/vi/wb6mcEdcjXA/default.jpg" alt="video thumbnail" width="150" height="150"/>
                    </div>
                )
            }
            <button onClick={handleSubmit} className='btn btn-lg custom-button mt-4'>Create Playlist</button>
            <div>
                <Link to='/' className='btn btn-lg custom-button mt-2'>Navigate Home</Link>
            </div>
        </div>
    );
};
