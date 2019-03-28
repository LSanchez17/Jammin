import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
    
  
  
  render() {
      return (
        <div className="TrackList">
           {
            /*
              Fixed by giving the tracklist component two identically named properties, 
              SearchResults gives tracks={this.props.searchResults} to TrackList
              Playlist gives tracks={this.props.pTracks} to TrackList
              this gives tracks two methods/properties, one containing the search results, and one 
              containing the added tracks on the playlist
            */
            !this.props.tracks ? 
            <p className='TrackList'>Search to add tracks to me :)</p> :
            
            this.props.tracks.map(track => {
            return <Track
            key={track.id}
            track={track} 
            addTrack={this.props.addTrack} 
            onRemove={this.props.onRemove} 
            isRemoval={this.props.isRemoval} 
            />
            })
        }
        </div>
      )
}
}

export default TrackList;