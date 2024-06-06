import React, { useState } from "react";

function SearchBar({ accessToken, setTrackList }) {
    const [song, setSong] = useState("");

    // Finds related song name using the search api
    const getData = async () => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${song}&type=track&limit=10`, {
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
        <div>
            <form onSubmit={handleOnSubmit}>
                <div>
                    <input type="text" name="songName" placeholder="Enter Song Name" value={song} onChange={handleSongChange} required></input>
                </div>
                <div>
                    <button type="submit">Search</button>
                </div>
            </form>
        </div>
    );
}

export default SearchBar