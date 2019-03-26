import React, {Component } from 'react';
import './App.css';
import SeachBar from "../SearchBar/SearchBar";
import Playlist from "../Playlist/Playlist";
import SearchResults from "../SearchResults/SearchResults";
import Spotify from '../../util/Spotify';


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
      const newTlist = [];
      newTlist.push(track);
      const tempTlist = [this.state.playlistTracks]
      tempTlist.push(newTlist);
      this.setState({playlistTracks: tempTlist});
    }
  }

  removeTrack = (track) =>{
    //same thing as above
    let trackDeleted = this.state.playlistTracks.filter(savedTrack =>  
   savedTrack.id !== track )
    this.setState({playlistTracks: [...trackDeleted]});
  }

  updatePlaylistName = (name) =>{
    this.setState({playlistName: name});
  }

  savePlaylist(){
    //map the state?
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    //pass trackURIs and PlaylistName to save to account
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({playlistName: 'New Playlist'});
    this.setState({playlistTracks: []});
  }

  search = (term) =>{
    //console.log(term);
    Spotify.search(term).then(tracks => { this.setState( {SearchResults: tracks}) });
  }



  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="Apps">
          <SeachBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults SearchResults={this.state.SearchResults} addTrack={this.addTrack}/>
            <Playlist pName={this.state.playlistName} pTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylis} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;