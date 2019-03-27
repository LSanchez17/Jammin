import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
    render() {
      return (
        <div className="TrackList">
           {
            /*
            this code is my final bug essentially. I cant figure out why it out... hmmm
            !this.props.tracks ? 
            <p className='TrackList'>Add tracks to me :)</p> :
            */
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