import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      term: this.props.query
    };
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.getSearchValue = this.getSearchValue.bind(this);
  }

  getSearchValue(){
    return this.state.term;
  }

  search(){
    if(this.state.term === "") return;
    this.props.onSearch(this.state.term);
  }

  handleTermChange(e){
    this.setState({term: e.target.value});
  }

  handleKey(e){
    if(e.keyCode === 13) this.search();
  }

  render(){
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" value={this.state.term} onChange={this.handleTermChange} onKeyDown={this.handleKey} />
        <button className="SearchButton" onClick={this.search}>SEARCH</button>
      </div>
    );
  }
  
}

export default SearchBar;
