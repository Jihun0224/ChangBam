import React from "react";
import TopAppBar from "../../appbar/appbar";
import "../../home2.css";
import Search from "../../SearchBar/searchbar";
import NestedList from "../../menulist/Board_list";
import Roombody from "./roombody";
class Home9 extends React.Component {
  render() {
    return (
      <div>
        <TopAppBar />
        <div className="toptop"></div>
        <div className="midmid">
          <Search />
        </div>
        <div className="market_main">
          <Roombody />
        </div>
        <div className="menubarbar">
          <NestedList />
        </div>
      </div>
    );
  }
}

export default Home9;
