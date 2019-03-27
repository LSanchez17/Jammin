import React from 'react';
import './SearchBar.css';


class SearchBar extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {searchQuery: ''};

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search(){
    //maybe missing a paremeter, unless its placed from the initial event change on APP
    this.props.onSearch(this.state.searchQuery);
    console.log(this.state.searchQuery);
  }
  
  handleTermChange = (event) => {
    this.setState({searchQuery: event.target.value});
    console.log(event.target.value);
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;