import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import { authorizeGrant, getHashParams } from './functions/implicitGrant';
import './App.css';

function App() {
  const [trackList, setTrackList] = useState([]);
  const [playList, setPlayList] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

  // Acquires credentials from authorization response
  let stateKey;
  const params = getHashParams(),
    token = params.access_token,
    state = params.state,
    storedState = localStorage.getItem(stateKey);

  // Manages the login status and token storage
  useEffect(() => {
    if (localStorage.getItem('tokenExpirationTime')) {
      if (token && state === storedState) {
        setAccessToken(token);
        setLoggedIn(true);

        // Calculates expiration time
        const storedExpirationTime = localStorage.getItem('tokenExpirationTime');
        const expirationTime = storedExpirationTime - Date.now();

        // Automatically logout after token expiration
        setTimeout(() => {
          logout();
        }, expirationTime);
      };
    }
  }, []);

  // Fetchs user profile display name
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("https://api.spotify.com/v1/me", {
          method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
        });

        if (response.ok) {
          const profile = await response.json();
          setUserName(profile.display_name);
          setUserId(profile.id)
        }
      } catch (error) {
        alert("Unable to fetch your profile!");
      };
    };
    fetchProfile();
  }, [accessToken]);

  // Handles logout steps
  const logout = () => {
    setLoggedIn(false);
    localStorage.clear();
    window.location = "http://localhost:3000"
  };

  // Redirects to api authorization
  const handleAuthorizeOnclick = (e) => {
    e.preventDefault();
    const url = authorizeGrant(stateKey);
    window.location = url;
    const expirationTime = Date.now() + 3600 * 1000;
    localStorage.setItem('tokenExpirationTime', expirationTime);
  };

  // Logout of current profile
  const handleLogoutOnClick = (e) => {
    e.preventDefault();
    logout();
  };

  // Layout for the app's login and main states
  const mainApp = (
    <div className="container">
      <h1> {`${userName}'s`} JAMMMS </h1>
      <SearchBar accessToken={accessToken} setTrackList={setTrackList} />
      <div className="results-container">
        <SearchResults trackList={trackList} setPlayList={setPlayList} />
        <Playlist accessToken={accessToken} userId={userId} playList={playList} setPlayList={setPlayList} />
      </div>
      <button onClick={handleLogoutOnClick}>LOGOUT</button>
    </div>
  );
  const loginIn = (
    <div className="login-container">
      <h2>LOGIN TO SPOTIFY TO START CREATING YOUR JAMMMS</h2>
      <button onClick={handleAuthorizeOnclick}>SIGN IN</button>
    </div>
  )

  return (
    <div className='App'>
      {loggedIn ? mainApp : loginIn}
    </div>
  );
}

export default App;
