import React from "react";
import TopAppBar from "../../../appbar/appbar";
import "../../../home2.css";
import Search from "../../../SearchBar/min";
import NestedList from "../../../menulist/Board_list";
import RoomWrite from "./roomwrite";

class RoomWriteMain extends React.Component {
  render() {
    return (
      <div>
        <TopAppBar />
        <div className="toptop"></div>
        <div className="midmid">
          <Search />
        </div>
        <div className="bmbm">
          <RoomWrite />
        </div>
        <div className="cdcd"></div>
        <div className="menubarbar">
          <NestedList />
        </div>
      </div>
    );
  }
}

export default RoomWriteMain;
