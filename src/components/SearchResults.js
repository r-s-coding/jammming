import React from "react";

import Tracklist from "./Tracklist";


function SearchResults({ trackList, setPlayList }) {

  const action = "Add";

  const handleOnClick = (track) => {
    setPlayList((curr) => {
      const inPlaylist = curr.some(item => item.uri === track.uri);
      if(!inPlaylist){
        return [...curr, track];
      } else {
        return [...curr];
      };
    });
  };

  return (
    <div>
      <h2>Results</h2>
      <div>
        <Tracklist trackList={trackList} handleOnClick={handleOnClick} action={action} />
      </div>
    </div>
  )
};

export default SearchResults