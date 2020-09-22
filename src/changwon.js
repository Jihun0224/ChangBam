import React from "react";
import TopAppBar from "./appbar/appbar";
import Postbody from "./post/post";
import "./home2.css";
import Search from "./SearchBar/min";
import NestedList from "./menulist/Board_list";
class Changwon extends React.Component {
  render() {
    return (
      <div>
        <TopAppBar />
        <div className="toptop">
          <div>
            <p>창원대 공지사항</p>
          </div>
        </div>
        <div className="midmid">
          <Search />
        </div>
        <div className="bmbm">
          <Postbody />
        </div>
        <div className="cdcd"></div>
        <div className="menubarbar">
          <NestedList />
        </div>
      </div>
    );
  }
}

export default Changwon;
