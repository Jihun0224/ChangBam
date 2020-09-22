import React, { Component } from "react";
import User from "./doctor.png";
import Next2 from "./next2.png";
import "./marketmain";
import Popover from "@material-ui/core/Popover";
class Recommentline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      recomment: "",
      click: false,
    };
    this.handleclick = this.handleclick.bind(this);
    this.handleclose = this.handleclose.bind(this);
  }
  handleclick(event) {
    event.preventDefault();
    this.setState({
      anchorEl: event.currentTarget,
    });
  }

  handleclose() {
    this.setState({
      anchorEl: null,
    });
  }
  render() {
    return (
      <div className="comments_line2">
        <img
          alt=""
          src={Next2}
          id="recomment_picture1"
          width="30px"
          height="30px"
        />
        <img
          alt=""
          src={User}
          id="recomment_picture2"
          width="30px"
          height="30px"
        />
        <div className="comments_body2">
          <a href="/" onClick={this.handleclick}>
            콩지훈
          </a>
          <span id="comments_time">2020/10월/02일</span>
          <input type="button" value={`신고`} />
          <div id="comments_text">
            <pre>asdasdasdasd asdasd</pre>
          </div>
        </div>
        <div>
          <Popover
            className="comments_popover"
            id={Boolean(this.state.anchorEl) ? "simple-popover" : undefined}
            open={Boolean(this.state.anchorEl)}
            anchorEl={this.state.anchorEl}
            onClose={this.handleclose}
            anchorOrigin={{
              vertical: "right",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: 4,
              horizontal: -10,
            }}
          >
            <a href="/">메세지</a>
            <hr />
            <a href="/">프로필</a>
          </Popover>
        </div>
      </div>
    );
  }
}

export default Recommentline;
