import React, { Component } from "react";
import "./search.css";
import searchimg from "./search.png";
class Search extends Component {
  render() {
    return (
      <div>
        <div className="box">
          <input type="text" placeholder="검색"></input>
        </div>
      </div>
    );
  }
}

export default Search;
