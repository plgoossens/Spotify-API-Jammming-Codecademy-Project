import React from 'react';
import './Track.css';

class Track extends React.Component {
  renderAction(){
    return <button className="Track-action">+</button>;
  }

  render(){
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.name || "Name"}</h3>
          <p>{this.props.artist || "Artist"} | {this.props.album || "Album"}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
  
}

export default Track;
