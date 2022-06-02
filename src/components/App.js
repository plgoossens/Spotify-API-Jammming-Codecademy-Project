import React from 'react';
import './App.css';
import Playlist from './Playlist/Playlist';
import SearchBar from './SearchBar/SearchBar.js';
import SearchResults from './SearchResults/SearchResults.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults : [
        {
          id: 1,
          name: "Premier single",
          album: "Premier album",
          artist: "Nouvel artiste"
        },
        {
          id: 2,
          name: "Deuxième single",
          album: "Deuxième album",
          artist: "Encore un artiste"
        },
        {
          id: 3,
          name: "Troisième single",
          album: "Troisième album",
          artist: "Dernier artiste"
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar/>
          <div className="App-playlist">
            <SearchResults results={this.state.searchResults}/>
            <Playlist/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;