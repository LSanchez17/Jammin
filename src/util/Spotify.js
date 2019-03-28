let accessToken = '';
const clientId = '27e7c80ea0304ea09b4ff5d811dc6315';
//const redirectURI = 'http://localhost:3000/';
const redirectURI = 'https://Jamminca.surge.sh';

const Spotify = {
  getAccessToken(){
    if(accessToken){
      return accessToken;
    }
    else if( window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/) ){
      //parsing url using access_token, token_type, expires_in, & state
      //api spotify, parameters, redirected urlwith token paramenters
      //use logic to check expiration and tokens
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      let expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
    
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      
      return accessToken;

    }
      /*
      testing/pseudo
      if(accessToken && expiresIn){
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
      }
      */
    else{
        let url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        window.location = url;
    }
  },
  search(search){
      let tempSearchtoken = Spotify.getAccessToken();
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${search}`, 
      {
       headers: { Authorization: `Bearer ${tempSearchtoken}` }  
      }).then(response => {
          return response.json()
      }).then( jsonResponse => {
          if( jsonResponse.tracks ){
            return jsonResponse.tracks.items.map(track =>
                 ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                 })
               )
          }
          else{
            let emptyArr = [];  
            return emptyArr;
          }
      })
  },
  savePlaylist(name, tracks){
    if(!name || !tracks){
      return;
    }
      let tempToken = Spotify.getAccessToken();
      let headers = { Authorization: `Bearer ${tempToken}`  };
      let userId;
      let playlistId;     

      return fetch('https://api.spotify.com/v1/me', { headers: headers })
       .then( response => 
          response.json()
          //get userID here
       )
       .then( jsonResponse => {
          userId = jsonResponse.id; 
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
          { headers: headers,
             method: 'POST', 
             body: JSON.stringify({name: name})
          })
        .then( response => 
          //console.log(response.json());
          response.json()
          //getting playlist stuff here now
        )
        .then( jsonResponse => {
          playlistId = jsonResponse.id;
          //console.log(playlistId);
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, 
          { 
            headers: headers, 
            method: 'POST',
            body: JSON.stringify({uris: tracks})  
          })
      });
    })
  }
}

export default Spotify;