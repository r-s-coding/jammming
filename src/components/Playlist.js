import React, { useState } from "react";
import Tracklist from "./Tracklist";

function Playlist({ playList, setPlayList }) {
    const [customName, setCustomName] = useState("");
    const [newPlayList, setNewPlayList] = useState([]);

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
        if (playList) {
            setNewPlayList(playList.map(item => item.uri));
            console.log(newPlayList);
            setPlayList([]);
        };
    };

    return (
        <div>
            <h2>Playlist</h2>
            <div>
                <input type="text" name="playlist" placeholder="Name Your Playlist" value={customName} onChange={handleOnChange}></input>
            </div>
            <div>
                <Tracklist trackList={playList} handleOnClick={handleOnClick} action="Remove" />
            </div>
            <button onClick={handleSaveOnClick}>Save to Spotify</button>

        </div>
    )
};


export default Playlist