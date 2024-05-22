import React, { useState, useEffect } from 'react';
import { createPlaylist, getVideos } from '../services';
import { VideoAPI, Video, emptyVideoResponse } from '../types/video';
import { Link } from 'react-router-dom';

export default (): JSX.Element => {

    const [playlistName, setPlaylistName] = useState<string>('');
    const [videoAPI, setVideoAPI] = useState<VideoAPI>(emptyVideoResponse);
    const [selectedVideos, setSelectedVideos] = useState<Video[]>([]);
    const [currIndex, setCurrIndex] = useState<number>(0);
    const [page, setPage] = useState<number>(1);

    const numberToDisplay = 5; // design decision to only display 5 videos at a time

    useEffect(() => {
        const fetchVideos = async (): Promise<void> => {
            const videoAPIResp = await getVideos(page);
            console.log(videoAPIResp, "HERE", page);
            setPage(page);
            setVideoAPI(videoAPIResp);
            const filteredVideos = videoAPIResp["videos"].slice(currIndex * 5, currIndex * 5 + 5);
            setSelectedVideos(filteredVideos);
        };

        fetchVideos();
    }, [page]);

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

    const decrementIndex = (): void => {
        if (currIndex === 0) {
            setCurrIndex(3);
            setPage(page - 1);
            console.log("Decrementing page");
        } else {
            const firstVideoIndex = (currIndex - 1) * 5;
            const filteredVideos = videoAPI["videos"].slice(firstVideoIndex, firstVideoIndex + 5);
            setSelectedVideos(filteredVideos);
            setCurrIndex(currIndex - 1);
        };
    };

    const incrementIndex = (): void => {
        if (currIndex === 3) {
            console.log("Incrementing page");
            setCurrIndex(0);
            setPage(page + 1);
        } else {
            const firstVideoIndex = (currIndex + 1) * 5;
            const filteredVideos = videoAPI["videos"].slice(firstVideoIndex, firstVideoIndex + 5);
            setSelectedVideos(filteredVideos);
            setCurrIndex(currIndex + 1);
        }
    };

    return(
        <div className='margin-left-large mt-4'>
            <h2>Create Playlist</h2>
            <div className="d-flex align-items-center mt-4">
                <label>Playlist:</label>
                <input type='text' placeholder='My first playlist' className='margin-left-small' onChange={(e) =>  setPlaylistName(e.target.value)}></input>
            </div>
            <h3 className="mt-4">Optional Videos (click to add to playlist):</h3>
            {
                videoAPI && (
                    <div className="d-flex align-items-center">
                        {
                            (currIndex > 0 || page !== 1) && <i className="bi bi-caret-left" onClick={decrementIndex}></i>
                        }
                        {
                            selectedVideos && selectedVideos.map((video) => {
                                return <div key={video.id} className="mt-4">
                                    <label>{video.id}</label>
                                    <img src={video.thumbnail_url} alt="video thumbnail" width="150" height="150" />
                                </div>
                            })
                        }
                        {
                            ((page * 20) < videoAPI.meta.total || videoAPI["videos"][videoAPI["videos"].length - 1] !== selectedVideos[selectedVideos.length - 1]) && <i className="bi bi-caret-right" onClick={incrementIndex}></i>
                        }
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
