import React from "react";
import TopAppBar from "../appbar/appbar";
import "./home2.css";
import Search from "../SearchBar/min";
import NestedList from "../menulist/Board_list";
import Meetingboardbody from "./meeting_board/meeting_board_body";
import MeetingWrite from "./meeting_board/meeting_write";

class Meeting_home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: "10",
    };
  }
  handleChangePage(e) {
    this.setState({});
  }
  render() {
    return (
      <div>
        <TopAppBar />
        <div className="toptop">
          <div>
            <p>과팅</p>
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

export default Meeting_home;
