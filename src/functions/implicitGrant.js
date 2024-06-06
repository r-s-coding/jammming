const generateRandomString = length => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const stateKey = 'spotify_auth_state';

function authorizeGrant(stateKey) {
    if (localStorage.getItem(stateKey)) {
        localStorage.removeItem(stateKey);
    };
    const client_id = "9bcb457c95c646a8b8e59399808e056d";
    const redirect_uri = "http://localhost:3000/callback";
    const state = generateRandomString(16);
    localStorage.setItem(stateKey, state);
    const scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public';
    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);

    return url;
};


function getHashParams() {
    let hashParams = {};
    let e,
        r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    };
    return hashParams;
};

export {authorizeGrant, getHashParams};