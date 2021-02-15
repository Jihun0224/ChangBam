import React, { Component } from "react";
import TopAppBar from "../appbar/appbar";
import NestedList from "../menulist/Board_list";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import "./view_post.css";
import Lovebutton from "./love_button";
import Postbutton from "./post_button";
import PreandNextPost from "./pre_next_post";
import BottomMenu from '../bottommenu/bottommenu';
import swal from 'sweetalert';
class ViewPost extends Component {
  editorRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      board_name: "",
      love_state: false,
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
      nickname: JSON.parse(localStorage.getItem("user")).nickname,
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

  componentDidMount() {

    if(JSON.parse(localStorage.getItem("user")) == null){
      swal({
        title: "로그인해 주세요!",
        icon: "warning",
      })
      this.props.history.goBack();
      
    }
    else{
      const postage_key = {
        postage_key: this.props.match.params.postage_key,
        board_key: this.props.match.params.board_key,
      }
      fetch("http://localhost:3001/api/PostageCheck", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(postage_key),
      })
      .then((res) => res.json())
      .then((res) =>{
      
      if(res == false){
        this.props.history.replace('/NoneExist')    }
      else{
        const post = {
          postage_key: this.props.match.params.postage_key,
          board_key: this.props.match.params.board_key,
          nickname: JSON.parse(localStorage.getItem("user")).nickname,
        };
        fetch("http://localhost:3001/api/view_post", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(post),
        })
          .then((res) => res.json())
          .then((res) => {
            this.setState({ data: res[0] });
            if (this.state.data.user_nickname === JSON.parse(localStorage.getItem("user")).nickname) {
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
              board_name_eng: "changbam",
            });
            break;
          case "6":
            this.setState({
              board_name: "학교 공지사항",
              board_name_eng: "changwon",
            });
            break;
          case '7':
            this.setState({
              board_name: "스터디 그룹",
              board_name_eng:"study"
              });
              break;
          case '8':
            this.setState({
              board_name: "꼰대 게시판",
              board_name_eng:"old"
              });
              break;
          case '9':
            this.setState({
              board_name: "취업게시판",
              board_name_eng:"EmploymentReview"
              });
                  break;
          case '10':
            this.setState({
              board_name: "채용공고",
              board_name_eng:"EmploymentAnnouncement"
              });
                  break;         
          default:
              break;
        }
      }
      })
    }
    
}
  render() {
    const { data, board_name, love_state } = this.state;
    const { onClick } = this;
    if(JSON.parse(localStorage.getItem("user")) == null){
      return(
        <>
        </>
      )
  }
  else{
    return (
      
      <div className="view_post">
        <TopAppBar />
        <div className="board_title">
          <Typography variant="h3"> {board_name}</Typography>
        </div>

        <div className="view_post_paper_d">
        <div className="menubarbar">
          <NestedList />
        </div>
          <Paper className="view_post_paper">
            <div className="postage_title">
              <Typography variant="h5">{data.postage_title}</Typography>

              <span className="view_post_info">
                <Typography className="view_post_nickname" variant="body1">
                {this.props.match.params.board_key === "1"
                ?<font>익명</font>
                : <font>{data.user_nickname}</font>}    
                <font color="#ccc"> | </font>
                {data.postage_date}
                </Typography>
                <Typography className="view_post_etc" variant="body1">
                  조회 {data.postage_views} 
                  <font color="#ccc"> | </font>
                  좋아요{data.postage_love}
                  <font color="#ccc"> | </font>
                  댓글 {data.postage_comment}
                </Typography>
              </span>
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
          <div className="viewpost_bottommenu">
          <BottomMenu/>
          </div>
        </div>
      </div>
    );
  }
}
}
export default ViewPost;