import React from 'react';
import { useState } from 'react';

import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import './App.css';

function App() {
  const [trackList, setTrackList] = useState([]);
  const [playList, setPlayList] = useState([]);

  return (
    <div className="App">
      <h1> MY JAMMMS </h1>
      <SearchBar setTrackList={setTrackList} />
      <SearchResults trackList={trackList} setPlayList={setPlayList} />
      <Playlist playList={playList} setPlayList={setPlayList} />
    </div>
  );
}

export default App;
