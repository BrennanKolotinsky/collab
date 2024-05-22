import React, { useState, useEffect } from 'react';
import { createPlaylist, getVideos } from '../services';
import { VideoAPI, Video, emptyVideoResponse } from '../types/video';
import { Link } from 'react-router-dom';

export default (): JSX.Element => {

    const [playlistName, setPlaylistName] = useState<string>('');
    const [videoAPI, setVideoAPI] = useState<VideoAPI>(emptyVideoResponse);
    const [displayedVideos, setDisplayedVideos] = useState<Video[]>([]);
    const [currIndex, setCurrIndex] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [selectedVideos, setSelectedVideos] = useState<Video[]>([]);

    const numberToDisplay = 5; // design decision to only display 5 videos at a time

    useEffect(() => {
        const fetchVideos = async (): Promise<void> => {
            const videoAPIResp = await getVideos(page);
            console.log(videoAPIResp, "HERE", page);
            setPage(page);
            setVideoAPI(videoAPIResp);
            const filteredVideos = videoAPIResp["videos"].slice(currIndex * 5, currIndex * 5 + 5);
            setDisplayedVideos(filteredVideos);
        };

        fetchVideos();
    }, [page]);

    const handleSubmit = async (): Promise<void> => {
        if (playlistName.length === 0) {
            alert('Please enter a playlist name');
            return;
        };

        const success = await createPlaylist(playlistName, selectedVideos);
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
            setDisplayedVideos(filteredVideos);
            setCurrIndex(currIndex - 1);
        };
    };

    const incrementIndex = (): void => {
        // 3 indicates we are currently on the fourth index, and there are 4 sets of 5 videos per 20 videos
        if (currIndex === 3) {
            console.log("Incrementing page");
            setCurrIndex(0);
            setPage(page + 1);
        } else {
            const firstVideoIndex = (currIndex + 1) * 5;
            const filteredVideos = videoAPI["videos"].slice(firstVideoIndex, firstVideoIndex + 5);
            setDisplayedVideos(filteredVideos);
            setCurrIndex(currIndex + 1);
        }
    };

    const addVideoToPlaylist = (video: Video) => {
        if (!selectedVideos.includes(video) && selectedVideos.length < 5) {
            setSelectedVideos((prevState) => [...prevState, video]);
            alert("Added video to playlist");
        };
    };

    const removeVideoFromPlaylist = (id: number) => {
        setSelectedVideos((prevState) => prevState.filter((video) => video.id !== id));
        alert("Removed video from playlist");
    };

    return(
        <div className='margin-left-large mt-4 mb-4'>
            <h2>Create Playlist</h2>
            <div className="d-flex align-items-center mt-4">
                <label>Playlist name:</label>
                <input type='text' placeholder='My first playlist' className='margin-left-small' onChange={(e) =>  setPlaylistName(e.target.value)}></input>
            </div>
            <h3 className="mt-4">Optional Videos (click to add to playlist):</h3>
            {
                videoAPI && (
                    <div className="d-flex align-items-center border">
                        {
                            (currIndex > 0 || page !== 1) &&
                                <div className="caret-container"><i className="bi bi-caret-left caret" onClick={decrementIndex}></i></div>
                        }
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
                                    displayedVideos && displayedVideos.map((video) => {
                                        return <tr key={video.id} className="mt-4" onClick={() => addVideoToPlaylist(video)}>
                                            <td>{video.id}</td>
                                            <td><img src={video.thumbnail_url} alt="video thumbnail" width="150" height="150" /> </td>
                                            <td>{video.title}</td>
                                            <td>{video.description?.substring(0, 100)}{video.description?.length >= 100 ? '...' : ''}</td>
                                            <td>{video.views}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                        {
                            ((page * 20) < videoAPI.meta.total || videoAPI["videos"][videoAPI["videos"].length - 1] !== displayedVideos[displayedVideos.length - 1]) &&
                                <div className="caret-container"><i className="bi bi-caret-right caret" onClick={incrementIndex}></i></div>
                        }
                    </div>
                )
            }

            <h3 className="mt-4">Selected Videos (click to remove from playlist):</h3>
            {
                videoAPI && (
                    <div className="d-flex align-items-center">
                        {
                            selectedVideos.map((video) => {
                                return <div key={video.id} className="mt-4" onClick={() => removeVideoFromPlaylist(video.id)}>
                                    <label>Id: {video.id}</label>
                                    <img src={video.thumbnail_url} alt="video thumbnail" width="150" height="150" />
                                </div>
                            })
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
