import React from 'react';
import { Video } from '../types/video';

type PlaylistTableProps = {
    videos: Partial<Video>[];
    addVideoToPlaylist: (video: Video) => void;
};
export default ({ videos, addVideoToPlaylist }: PlaylistTableProps): JSX.Element => {
    return (
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
                    videos.map((video: Partial<Video>) => {
                        return <tr key={video.id} className="mt-4" onClick={() => addVideoToPlaylist?.(video as Video)}>
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
    )
}