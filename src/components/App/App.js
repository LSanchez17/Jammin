import React, {Component } from 'react';
import './App.css';
import SeachBar from "../SearchBar/SearchBar";
import Playlist from "../Playlist/Playlist";
import SearchResults from "../SearchResults/SearchResults";
import Spotify from './../../util/Spotify';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      SearchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };
    
    console.log(this.state.SearchResults);
    console.log(this.state.playlistTracks);


    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  
  addTrack = (track) =>{
    //add track.id on right side of equal brackets, wont work until we do something?
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      console.log('track already in!');
      return;
    }
    else{
      let tempTlist = this.state.playlistTracks;
      tempTlist.push(track);
      this.setState({playlistTracks: tempTlist});
      console.log(`Current track being pushed ${track}`);
      console.log(`Current tracks in temporary array ${this.state.playlistTracks}`);

    }
  }

  removeTrack = (track) =>{
    //same thing as above
    let trackDeleted = this.state.playlistTracks.filter(savedTrack =>  
   savedTrack.id !== track.id )
    this.setState({playlistTracks: trackDeleted});
  }

  updatePlaylistName = (name) =>{
    console.log(`Playlist name being set ${name}`);
    this.setState({playlistName: name});
  }

  savePlaylist(){
    //map the state?
    const trackURIs = this.state.playlistTracks.map(track => { return track.uri });
    console.log(`Saving playlist name ${this.state.playlistName}, with tracks uris ${trackURIs}`)
    //pass trackURIs and PlaylistName to save to account
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() =>  this.setState({playlistName: 'New Playlist', playlistTracks: []}));

  }

  search = (term) =>{
    console.log(term);
    //return tracks from state?
    Spotify.search(term).then(tracks => { this.setState( {SearchResults: tracks} ) });
  }



  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="Apps">
          <SeachBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.SearchResults} addTrack={this.addTrack}/>
            <Playlist pName={this.state.playlistName} pTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;