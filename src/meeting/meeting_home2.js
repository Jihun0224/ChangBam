import React from "react";
import TopAppBar from "../appbar/appbar";
import "./home2.css";
import Search from "../SearchBar/min";
import NestedList from "../menulist/Board_list";
import Meetingboardbody from "./meeting_board/meeting_board_body";
import MeetingWrite from "./meeting_board/meeting_write";

class Meeting_home2 extends React.Component {
  render() {
    return (
      <div>
        <TopAppBar />
        <div className="toptop">
          <div>
            <p>스터디그룹</p>
          </div>
        </div>
        <div className="midmid">
          <Search />
        </div>
        <div className="bmbm">
          <Meetingboardbody />
        </div>
        <div className="write_meeting">
          <MeetingWrite />
        </div>
        <div className="menubarbar">
          <NestedList />
        </div>
      </div>
    );
  }
}

export default Meeting_home2;
