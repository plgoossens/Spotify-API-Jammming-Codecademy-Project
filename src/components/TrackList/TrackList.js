import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
  render() {
    const list = this.props.list || [];
    const tracks = list.map((elem) => {
      return <Track key={elem.id} name={elem.name} artist={elem.artist} album={elem.album}/>
    });

    return(
      <div className="TrackList">
          {tracks}
      </div>
    );
  }
}

export default TrackList;
