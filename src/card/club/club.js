import React from "react";
import TopAppBar from "../../appbar/appbar";
import "../../home2.css";
import Search from "../../SearchBar/searchbar";
import NestedList from "../../menulist/Board_list";
import Griddongali from "../gridcard/gridd";
import Button from "@material-ui/core/Button";

class Club extends React.Component {
  render() {
    return (
      <div>
        <TopAppBar />
        <div className="toptop">
          <div>
            <p>동아리 홍보</p>
          </div>
        </div>
        <div className="midmid">
          <Search />
        </div>
        <div className="bmbm">
          <Button
            className="clubwritingbutton"
            variant="outlined"
            color="primary"
            id="market_button"
            href="/7"
          >
            홍보하기
          </Button>
          <Griddongali />
        </div>

        <div className="menubarbar">
          <NestedList />
        </div>
      </div>
    );
  }
}

export default Club;
