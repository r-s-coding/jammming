import React from "react";
import { useState, useEffect } from "react";

import MockResponse from "../componentTests/MockResponse";


function SearchBar({ setTrackList }) {
    const response = MockResponse();
    const parsedData = response.tracks.items.map((item) => ({
        name: item.name,
        artist: item.artists[0].name,
        album: item.album.name,
        uri: item.uri
    }));

    useEffect(() => {
        setTrackList(parsedData);
    }, []);    

    return (
        <div>
            <form>
                <div>
                    <input type="text" name="name" placeholder="Song Name"></input>
                </div>
                <div>
                    <input type="submit" value="Search" />
                </div>
            </form>
        </div>
    );
}

export default SearchBar