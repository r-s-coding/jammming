import React from "react";
import styles from "../styles/Track.module.css"

function Track({ track }) {
    return (
        <div className={styles.container}>
            {track.name} <br/>
            <span className={styles.span}>{track.artist} | {track.album}</span>
        </div>
    )
};

export default Track