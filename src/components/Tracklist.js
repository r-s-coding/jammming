import React from "react";
import Track from "./Track";
import styles from "../styles/Tracklist.module.css"

function Tracklist({ trackList, handleOnClick, action }) {
    return (
        <ul className={styles.ul}>
            {trackList.map(track => (
                <li key={track.uri} className={styles.li}>
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