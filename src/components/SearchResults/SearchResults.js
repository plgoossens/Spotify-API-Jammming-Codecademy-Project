import React from 'react';
import TrackList from '../TrackList/TrackList';
import './SearchResults.css';

class SearchResults extends React.Component {
  render(){
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList list={this.props.results} onAdd={this.props.onAdd} isRemoval={false}/>
      </div>
    );
  }
  
}

export default SearchResults;
