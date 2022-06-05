import React from 'react';
import Spotify from '../util/Spotify';
import './App.css';
import Playlist from './Playlist/Playlist';
import SearchBar from './SearchBar/SearchBar.js';
import SearchResults from './SearchResults/SearchResults.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults : [],
      playlistName: "New playlist",
      playlistTracks: [],
      query: ""
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.checkURLParams();
  }

  checkURLParams(){
    Spotify.checkToken();
    if(window.location.href.match(/state=([^&]*)/)!==null){
      const query = window.location.href.match(/state=([^&]*)/)[1];
      this.setState({
        query: query
      });
    }
    //window.history.pushState('Access Token', null, '/');
  }

  addTrack(track){
    if(!this.state.playlistTracks.some(e => e.id === track.id)){
      this.setState({
        playlistTracks: this.state.playlistTracks.concat([track])
      });
    }
  }

  removeTrack(track){
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(e => e.id !== track.id)
    });
  }

  updatePlaylistName(name){
    this.setState({
      playlistName: name
    });
  }

  getURIarray(){
    let list = this.state.playlistTracks;
    if(list.length ===0)return [];
    let ans = [];
    for(let i = 0; i<list.length; i++){
      ans.push(list[i].uri);
    }
    return ans;
  }

  async savePlaylist(){
    await Spotify.savePlaylist(this.state.playlistName, this.getURIarray());
    this.setState({
      playlistName: "New playlist",
      playlistTracks: []
    });
  }

  async search(searchTerm){
    this.setState({
      searchResults: await Spotify.search(searchTerm)
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} query={this.state.query}/>
          <div className="App-playlist">
            <SearchResults results={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist name={this.state.playlistName} tracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;