import React, { useState } from "react";
import styles from '../styles/SearchBar.module.css';

function SearchBar({ accessToken, setTrackList }) {
    const [song, setSong] = useState("");

    // Finds related song name using the search api
    const getData = async () => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${song}&type=track&limit=15`, {
                method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
            });

            if (response.ok) {
                const data = await response.json();
                const parsedData = data.tracks.items.map((item) => ({
                    name: item.name,
                    artist: item.artists[0].name,
                    album: item.album.name,
                    uri: item.uri
                }));
                setTrackList(parsedData);
            }
        } catch (error) {
            alert('Search Error')
        };
    };

    const handleSongChange = ({ target }) => {
        setSong(target.value);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        getData();
        setSong("");
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleOnSubmit}>
                <div className={styles.input}>
                    <input
                        type="text"
                        name="songName"
                        placeholder="Enter Song Name"
                        value={song}
                        onChange={handleSongChange}
                        required
                    />
                </div>
                <div className={styles.button}>
                    <button type="submit">SEARCH</button>
                </div>
            </form>
        </div>
    );
}

export default SearchBar