import React, { useState, useEffect } from 'react';
import Tracklist from "./Tracklist";

function Playlist({ accessToken, userId, playList, setPlayList }) {
    const [customName, setCustomName] = useState("");
    const [newPlayList, setNewPlayList] = useState([]);

    // Updates the playlist uris to be posted
    useEffect(() => {
        const playListItems = playList.map(item => item.uri);
        setNewPlayList(playListItems);
    }, [playList]);

    const createPlaylist = async () => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({ name: customName})
            });
            if (response.ok) {
                const createdPlaylist = await response.json();
                const addTracks = await fetch(`https://api.spotify.com/v1/playlists/${createdPlaylist.id}/tracks`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({ uris: newPlayList })
                });
                if (addTracks.ok) {
                    setPlayList([]);
                    setCustomName("");
                    alert("Your new playlist has been added to your Spotify account!");                    
                };
            };
        } catch (error) {
            alert("Failed to create playlist");
        };
    };

    // Handles the Removal of tracks from playlist
    const handleOnClick = (track) => {
        setPlayList((curr) => {
            return curr.filter(item => item.uri !== track.uri);
        });
    };
    // Updates the custom name of the playlist
    const handleOnChange = ({ target }) => {
        setCustomName(target.value);
    }
    // Creates the playlist array for submission
    const handleSaveOnClick = (event) => {
        event.preventDefault();
        createPlaylist();
    };



    return (
        <div>
            <h2>Playlist</h2>
            <div>
                <input type="text" name="playlist" placeholder="Name Your Playlist" value={customName} onChange={handleOnChange} required></input>
            </div>
            <div>
                <Tracklist trackList={playList} handleOnClick={handleOnClick} action="Remove" />
            </div>
            <button onClick={handleSaveOnClick} disabled={!customName || newPlayList.length === 0}>Save to Spotify</button>
        </div>
    )
};


export default Playlist