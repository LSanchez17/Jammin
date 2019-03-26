import SearchBar from "../components/SearchBar/SearchBar";

let accessToken;
const clientId = '27e7c80ea0304ea09b4ff5d811dc6315';
const redirectURI = 'http://localhost:3000/';


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
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${search}`, 
      {
       headers: { Authorization: `Bearer ${accessToken}` }  
      }).then(response => {
          return response.json()
      }).then( jsonResponse => {
          if( jsonResponse.tracks ){
            return jsonResponse.map(track =>
                 ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    URI: track.uri
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
    if(!name && !tracks){
      return;
    }

    else{
      let tempToken = Spotify.getAccessToken();
      let headers = { Authorization: `Bearer ${tempToken}`  };
      let userId;

      return fetch('https://api.spotify.com/v1/me', 
      {headers: headers}).then(response => { 
          return response.json()
          //get userID here
        }).then(jsonResponse => {
           userId = jsonResponse.id; 
           return fetch(`https://api.spotify.com/v1/me/v1/users/${userId}/playlists`, 
           {method: 'POST', 
            headers: headers, 
            body: JSON.stringify({name: name})
           }).then(response => {
          return response.json();
          //getting playlist stuff here now
        }).then(jsonResponse => {
          let playlistId = jsonResponse.id;
          return fetch(`/v1/users/${userId}/playlists/${playlistId}/tracks`, 
          {
            method: 'POST', 
             headers: headers, 
             body: JSON.stringify({uri: tracks})  
          })
      });
    })
  }
}
}

export default Spotify;