import React from "react";
import TopAppBar from "../../appbar/appbar";
import "../../home2.css";
import Search from "../../SearchBar/min";
import NestedList from "../../menulist/Board_list";
import Gridmarket from "../gridcard/gridm";
import Button from "@material-ui/core/Button";

class Market extends React.Component {
  render() {
    return (
      <div>
        <TopAppBar />
        <div className="toptop">
          <div>
            <p>창밤인 마켓</p>
          </div>
        </div>
        <div className="midmid">
          <Search />
        </div>
        <div className="bmbm">
          <Button
            variant="outlined"
            color="primary"
            id="market_button"
            href="/6"
          >
            팔기
          </Button>
          <Gridmarket />
        </div>
        <div className="cdcd"></div>
        <div className="menubarbar">
          <NestedList />
        </div>
      </div>
    );
  }
}

export default Market;
