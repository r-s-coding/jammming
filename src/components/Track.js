import React from "react";

function Track({ track }) {
    return (
        <div>
            {track.name} <br/>
            {track.artist} | {track.album}
        </div>
    )
};

export default Track