import React from "react";
import TopAppBar from "../../appbar/appbar";
import "../../home2.css";
import Search from "../../SearchBar/min";
import NestedList from "../../menulist/Board_list";
import Dongali from "./dongali/dongali";

class Home3 extends React.Component {
  render() {
    return (
      <div>
        <TopAppBar />
        <div className="toptop"></div>
        <div className="midmid">
          <Search />
        </div>
        <div className="dongali_main_home">
          <Dongali />
        </div>
        <div className="menubarbar">
          <NestedList />
        </div>
      </div>
    );
  }
}

export default Home3;
