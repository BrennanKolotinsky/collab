import React, {
    useState,
    useEffect,
} from 'react';
import { Playlist } from '../types/playlist';
import { getPlaylists } from '../services';
import { Link } from 'react-router-dom';

export const CreatePlaylistButtom = (): JSX.Element => {
    return (
        <div className="d-flex justify-content-center mt-4">
            <Link
                to="/createPlaylist"
                className="btn btn-lg custom-button"
                role="button"
                >
                Create Playlist
            </Link>
        </div>
    );
};

export default () => {

    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    useEffect(() => {
        const fetchPlaylists = async (): Promise<void> => {
            const playlists = await getPlaylists();
            setPlaylists(playlists);
        };

        fetchPlaylists();
    }, []);

    if (playlists.length === 0) {
        return <CreatePlaylistButtom />;
    };

    return (
        <div className="table-responsive">
            <table className="mx-auto w-75">
                <tr>
                    <th className='border w-50'>Playlist</th>
                    <th className='border w-50'>Video Count</th>
                </tr>
                {
                    playlists.map((playlist: Playlist) => {
                        return <tr>
                            <td className='border'>
                                <Link to={`/playlist/${playlist.id}`}>
                                    {playlist.name}
                                </Link>
                            </td>
                            <td className='border'>X</td>
                        </tr>
                    })
                }
            </table>
            <CreatePlaylistButtom />
        </div>
    );
};
