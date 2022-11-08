let token = "";
let expirationTime = "";

const Spotify = {
    getAccessToken(){
        if(token !== ""){
            return token;
        }else if(!this.checkToken()){
            var client_id = ''; // INSERT CLIENT ID HERE
            var redirect_uri = 'http://localhost:3000/callback';
            var scope = 'playlist-modify-public';

            var url = 'https://accounts.spotify.com/authorize';
            url += '?response_type=token';
            url += '&client_id=' + encodeURIComponent(client_id);
            url += '&scope=' + encodeURIComponent(scope);
            url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
            window.location.assign(url);
        }
    },

    checkToken(){
        if(window.location.href.match(/access_token=([^&]*)/)!==null){
            token = window.location.href.match(/access_token=([^&]*)/)[1];
            expirationTime = window.location.href.match(/expires_in=([^&]*)/)[1];
            window.setTimeout(() => token = '', expirationTime * 1000);
            return true;
        }else return false;
    },

    async search(term){
        if(token==="") this.getAccessToken();
        const response = await fetch('https://api.spotify.com/v1/search?type=track&q=' + term, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const jsonResponse = await response.json();
        let tracks = [];
        for(var i = 0; i<jsonResponse.tracks.items.length; i++){
            const track = jsonResponse.tracks.items[i];
            tracks.push({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            });
        }
        return tracks;
    },

    async savePlaylist(name, tracks){
        if(token==="") this.getAccessToken();
        if(!name || !tracks) return;

        let userID = "";
        let playlistID = "";
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const jsonResponse = await response.json();
        userID = jsonResponse.id;
        console.log(jsonResponse.display_name);

        const responsePost = await fetch('https://api.spotify.com/v1/users/' + userID + '/playlists', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name
            })
        });
        const jsonResponsePost = await responsePost.json();
        playlistID = jsonResponsePost.id;

        await fetch('https://api.spotify.com/v1/playlists/' + playlistID + '/tracks', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                uris: tracks
            })
        });
    }
};

export default Spotify;
