import React, { Component } from "react";
import TopAppBar from "../appbar/appbar";
import NestedList from "../menulist/Board_list";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import "./view_post.css";
import Lovebutton from "./love_button";
import Postbutton from "./post_button";
import PreandNextPost from "./pre_next_post";

class ViewPost extends Component {
  editorRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      board_name: "",
      love_state: false,
      nickname: JSON.parse(localStorage.getItem("user")).nickname,
      own_post_state: false,
      board_name_eng: "",
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (this.state.love_state === true) {
      this.setState({ love_state: false });
    } else {
      this.setState({ love_state: true });
    }

    const post = {
      love_state: this.state.love_state,
      postage_key: this.props.match.params.postage_key,
      board_key: this.props.match.params.board_key,
      nickname: this.state.nickname,
    };
    fetch("http://localhost:3001/api/post_love_adjustment", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    });
    fetch("http://localhost:3001/api/user_post_love_state_update", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    });
  }

  componentWillMount() {
    const post = {
      postage_key: this.props.match.params.postage_key,
      board_key: this.props.match.params.board_key,
      nickname: this.state.nickname,
    };
    fetch("http://localhost:3001/api/viewpost", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ data: res[0] });
        if (this.state.data.user_nickname === this.state.nickname) {
          this.setState({ own_post_state: true });
        }
      });

    fetch("http://localhost:3001/api/view_post_love_state", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res[0] === undefined) {
          this.setState({ love_state: false });
        } else {
          this.setState({ love_state: true });
        }
      });

    switch (this.props.match.params.board_key) {
      case "0":
        this.setState({ board_name: "자유 게시판", board_name_eng: "free" });
        break;
      case "1":
        this.setState({
          board_name: "익명 게시판",
          board_name_eng: "anonymous",
        });
        break;
      case "2":
        this.setState({ board_name: "새내기 게시판", board_name_eng: "new" });
        break;
      case "3":
        this.setState({ board_name: "연애 상담소", board_name_eng: "love" });
        break;
      case "4":
        this.setState({ board_name: "정치 게시판", board_name_eng: "politic" });
        break;
      case "5":
        this.setState({
          board_name: "창밤 공지사항",
          board_name_eng: "공지사항",
        });
        break;
      case "6":
        this.setState({
          board_name: "학교 공지사항",
          board_name_eng: "학교공지사항",
        });
        break;
      // case "study":
      //     this.setState({board_key:7});
      //     break;
      default:
        this.setState({ board_name: "스터디 그룹", board_name_eng: "study" });
    }
  }

  render() {
    const { data, board_name, love_state } = this.state;
    const { onClick } = this;
    return (
      <div className="viewpost">
        <TopAppBar />
        <div className="baord_title">
          <Typography variant="h2"> {board_name}</Typography>
        </div>

        <div className="view_post_paper_d">
          <Paper className="view_post_paper">
            <div className="postage_title">
              <Typography variant="h5">{data.postage_title}</Typography>

              <div className="view_post_info">
                <Typography className="view_post_nickname" variant="body1">
                  {data.user_nickname} <font color="#ccc"> | </font>
                  {data.postage_date}
                </Typography>
                <Typography className="view_post_etc" variant="body1">
                  조회 {data.postage_views} <font color="#ccc"> | </font>좋아요{" "}
                  {data.postage_love}
                  <font color="#ccc"> | </font>댓글 {data.postage_comment}
                </Typography>
              </div>
            </div>

            <div
              className="postage_info"
              dangerouslySetInnerHTML={{ __html: data.postage_body }}
            ></div>

            <div className="love_button">
              <Lovebutton
                love_state={love_state}
                board_key={this.props.match.params.board_key}
                postage_key={this.props.match.params.postage_key}
                onClick={onClick}
              />
            </div>
          </Paper>

          <div className="view_post_button">
            <Postbutton
              own_post_state={this.state.own_post_state}
              board_key={this.props.match.params.board_key}
              postage_key={this.props.match.params.postage_key}
            />
          </div>

          <div className="comment_window_d">
            <Paper className="comment_window">
              <Typography variant="h1"> 댓글~</Typography>
              <PreandNextPost
                postage_key={this.props.match.params.postage_key}
                board_key={this.props.match.params.board_key}
                board_name={this.state.board_name_eng}
              />
            </Paper>
          </div>
        </div>

        <div className="menubarbar">
          <NestedList />
        </div>
      </div>
    );
  }
}

export default ViewPost;
