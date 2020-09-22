import React from "react";
import TopAppBar from "../../appbar/appbar";
import "../../home2.css";
import Search from "../../SearchBar/min";
import NestedList from "../../menulist/Board_list";
import RoomGird from "../gridcard/gridr";
import Button from "@material-ui/core/Button";

class Room extends React.Component {
  render() {
    return (
      <div>
        <TopAppBar />
        <div className="toptop">
          <div>
            <p>자취방 마켓</p>
          </div>
        </div>
        <div className="midmid">
          <Search />
        </div>
        <div className="bmbm">
          <Button
            variant="outlined"
            color="primary"
            id="room_button"
            href="/roomwrite"
          >
            방내놓기
          </Button>
          <RoomGird />
        </div>
        <div className="cdcd"></div>
        <div className="menubarbar">
          <NestedList />
        </div>
      </div>
    );
  }
}

export default Room;
