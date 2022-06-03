import './Playlist.css';
import TrackList from '../TrackList/TrackList';
import React from 'react';

class Playlist extends React.Component {
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e){
    this.props.onNameChange(e.target.value);
  }

  render(){
    return (
      <div className="Playlist">
        <input defaultValue={this.props.name} onChange={this.handleNameChange}/>
        <TrackList list={this.props.tracks} onRemove={this.props.onRemove} isRemoval={true}/>
        <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
      </div>
    );
  }
}

export default Playlist;
