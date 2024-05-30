import React from "react";
import Track from "./Track";

function Tracklist({ trackList, handleOnClick, action }) {
    return (
        <ul>
            {trackList.map(track => (
                <li key={track.uri}>
                    <Track track={track} />
                    <button onClick={() => handleOnClick(track)}>
                        {action}
                    </button>
                </li>
            ))}
        </ul>
    )
};


export default Tracklist