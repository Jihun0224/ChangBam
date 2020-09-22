import React, { Component } from "react";
import User from "./doctor.png";
import Next2 from "./next2.png";
import "./marketmain";
import Popover from "@material-ui/core/Popover";
import "./marketmain.css";
import Button from "@material-ui/core/Button";

class Recommentline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      recomment: "",
      click: false,
      nickname: "",
      dcomment_row: [],
    };
    this.handleclick = this.handleclick.bind(this);
    this.handleclose = this.handleclose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    const post = {
      key: this.props.keyvalue,
    };
    fetch("api/dcomments", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          dcomment_row: json,
        });
      });
  }
  onSubmit(e) {
    e.preventDefault();
    console.log(this.props.keyvalue);
    const post = {
      key: this.props.keyvalue,
      recomment: this.state.recomment,
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
    const { recomment, dcomment_row } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <div className="comments_line2">
        <form onSubmit={onSubmit}>
          <div className="recomment_input">
            <label>댓글 쓰기</label>
            <textarea
              placeholder="댓글을 입력하세요."
              name="recomment"
              value={this.state.recomment}
              onChange={onChange}
            />
            <input
              onClick={() => window.location.reload(false)}
              type="submit"
              value="댓글 달기"
            />
          </div>
        </form>
        {dcomment_row.map((row) => (
          <div>
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
              <a href="" onClick={this.handleclick}>
                {row.dcomment_nickname}
              </a>
              <span id="comments_time">{row.dcomment_date}</span>
              <input type="button" value={`신고`} />
              <div id="comments_text">
                <pre>{row.dcomment_body}</pre>
              </div>
            </div>
          </div>
        ))}
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
            <a href="">메세지</a>
            <hr />
            <a href="">프로필</a>
          </Popover>
        </div>
      </div>
    );
  }
}

export default Recommentline;
