/*
  Name tracklist property tracks, same property name as the property name being given in SearchResults 
  TrackList
  this fixed the cant read property of undefined.  Giving a property two different attributes
  with the same props name works? not exactly sure 100% how, but it works  :)
*/

import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);

  }
  handleNameChange(event){
    this.props.onNameChange(event.target.value);
  }
  
  render(){
        return (
          <div className="Playlist">
            <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
            <TrackList tracks={this.props.pTracks} onRemove={this.props.onRemove} isRemoval={true} />
            <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
          </div>
        )
    }
}

export default Playlist;