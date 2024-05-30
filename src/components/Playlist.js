import React from "react";

import Tracklist from "./Tracklist";

function Playlist({ playList, setPlayList }) {
    const action = "Remove";

    const handleOnClick = (track) => {
        setPlayList((curr) => {
            return curr.filter(item => item.uri !== track.uri);
        })
;
    };

    return (
        <div>
            <h2>Playlist</h2>
            <div>
                <Tracklist trackList={playList} handleOnClick={handleOnClick} action={action} />
            </div>

        </div>
    )
};


export default Playlist