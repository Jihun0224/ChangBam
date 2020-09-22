import React, { Component } from "react";
import User from "./username.png";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Recommentline from "./commentline";
import "./marketmain";
import Next2 from "./next2.png";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      input: "",
      data: "",
      nickname: "",
      comment_row: [],
      click: [],
      recomment: [],
      recomments: "",
      nickname_message: "",
    };
    this.handleclick = this.handleclick.bind(this);
    this.handleclose = this.handleclose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    const post = {};
    fetch("api/comments", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("된다아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ");
        this.setState({
          comment_row: json,
        });
      });
  }
  onSubmit(e) {
    e.preventDefault();
    const post = {
      recomment: this.state.recomments,
      nickname: JSON.parse(localStorage.getItem("user")).nickname,
    };
    fetch("api/dcomment", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleclick(event, nickname) {
    event.preventDefault();
    this.setState({
      anchorEl: event.currentTarget,
      nickname_message: nickname,
    });
  }
  handleclick2(comment) {
    //배열을 주어 버튼마다 종류를 다르게 한다.
    var buttonData = this.state.click;
    var recommentData = this.state.recomment;

    if (this.state.click[comment] === true) {
      buttonData[comment] = false;
      recommentData[comment] = (
        <div>
          <Recommentline keyvalue={comment} />
        </div>
      );
    } else if (this.state.click[comment] === false) {
      this.setState({
        input: "",
      });
      buttonData[comment] = true;
      recommentData[comment] = "";
    } else {
      console.log(comment);
      buttonData[comment] = false;
      recommentData[comment] = (
        <div>
          <Recommentline keyvalue={comment} />
        </div>
      );
    }
    this.setState({
      click: buttonData,
      recomment: recommentData,
    });
  }
  handleclose() {
    this.setState({
      anchorEl: null,
    });
  }

  render() {
    const { comment_row } = this.state;
    return (
      <div>
        {comment_row.map((row, index) => (
          <div className="comments_line">
            <img alt="" src={User} width="30px" height="30px" />
            <div className="comments_body">
              <a
                href=""
                onClick={(e) => this.handleclick(e, row.comment_nickname)}
              >
                {row.comment_nickname}
              </a>
              <span id="comments_time">{row.comment_date}</span>
              <button
                key={row.comment_key}
                onClick={this.handleclick2.bind(this, row.comment_key)}
              >
                답글
              </button>
              <input type="button" value={`신고`} />
              <div id="comments_text">
                <pre>{row.comment_body}</pre>
              </div>
            </div>
            <div>{this.state.recomment[row.comment_key]}</div>
          </div>
        ))}
        <div>
          <Popover
            className="comments_popover"
            id={Boolean(this.state.anchorEl) ? "simple-popover" : undefined}
            open={Boolean(this.state.anchorEl)}
            anchorEl={this.state.anchorEl}
            onClose={this.handleclose}
            nickname_message={this.state.nickname_message}
            anchorOrigin={{
              vertical: "right",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: 4,
              horizontal: -10,
            }}
          >
            <a href="">메세지</a>
            <hr />
            <a href="">프로필</a>
            {console.log(this.state.nickname_message)}
          </Popover>
        </div>
      </div>
    );
  }
}

export default Comments;
