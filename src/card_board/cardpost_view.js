import React, { Component } from "react";
import TopAppBar from "../appbar/appbar";
import NestedList from "../menulist/Board_list";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import "./cardpost_view.css";
import Lovebutton from "../postage/love_button";
// import Postbutton from "./post_button";
// import PreandNextPost from "./pre_next_post";
import BottomMenu from '../bottommenu/bottommenu';
import swal from 'sweetalert';
import Search from "../SearchBar/searchbar";
import PhotoSlide from './PhotoSlide';
import Button from "@material-ui/core/Button";

class CardPost_View extends Component {
  editorRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      board_name: "",
      love_state: false,
      own_post_state: false,
      postNum:0,
      clubTitle:'',
      clubShowbody:'',
      clubBody:'',
      nickname:'',
      current_nickname:''
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (this.state.love_state === true) {
      this.setState({ love_state: false });
    } else {
      this.setState({ love_state: true });
    }
  //   카드형 게시글 좋아요로 변경 필요
  //   const post = {
  //     love_state: this.state.love_state,
  //     postage_key: this.props.match.params.postage_key,
  //     board_key: this.props.match.params.board_key,
  //     nickname: JSON.parse(localStorage.getItem("user")).nickname,
  //   };
  //   fetch("http://localhost:3001/api/post_love_adjustment", {
  //     method: "post",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(post),
  //   });
  //   fetch("http://localhost:3001/api/user_post_love_state_update", {
  //     method: "post",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(post),
  //   });
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
    
        switch (this.props.match.params.card_UN) {        
          case "0":
            this.setState({
              board_name: "동아리홍보",
            });
            break;
          case "1":
            this.setState({
              board_name: "창밤인마켓",
            });
            break;
          case "2":
            this.setState({
              board_name: "스터디그룹",
              });
              break;        
          default:
              break;
        }
      }

    }
    

  render() {
    const { data, board_name, love_state } = this.state;
    const { onClick } = this;
    if(JSON.parse(localStorage.getItem("user")) == null){
      return(
        <>
        </>
      )}
  else{
    return (
      
      <div className="cardpost_view">
        <TopAppBar />
        <div className="board_title">
          <Typography variant="h3"> {board_name}</Typography>
        </div>
        <div className="searchbar">
          <Search />
        </div>
        <div className="cardpost_view_paper_d">
            <div className="menubarbar">
            <NestedList />
            </div>
          <Paper className="cardpost_view_paper" elevation={0}>
            <div className="cardpost_view_info">
              <Typography variant="h5">{data.card_title}동아리명</Typography>      
              <span>
                <Typography className="cardpost_view_nickname" variant="body1">
                <font>{data.user_nickname}작성자</font> 
                <font color="#ccc"> | </font>
                {data.card_date}작성일자
                </Typography>
                <Typography className="cardpost_view_etc" variant="body1">
                  조회 152{data.postage_views} {/*DB에 추가필요*/}
                  <font color="#ccc"> | </font>
                  좋아요 15{data.postage_love}
                  <font color="#ccc"> | </font>
                  댓글 54{data.postage_comment}
                </Typography>
              </span>
            </div>

            <div className="postage_info">
                <div className="cardpost_photoslide">{/*PhotoSlide에 props로 DB에 저장된 사진을 보내줘서 렌더하도록 추가해야됨*/}
                    <PhotoSlide/>
                </div>
                <div className="cardpost_content">
                    <Typography>카테고리</Typography>
                    <Typography>세부홍보</Typography>
                </div>
            </div>

            <div className="love_button">
              <Lovebutton
                love_state={love_state}
                onClick={onClick}
              />
            </div>
          </Paper>

          <div className="cardpost_view_button">
          <Button
          variant="contained"
          color="primary"
          id="all_post"
          onClick = { () => {document.location.href = `/${this.props.match.params.board_name}/list/card=${this.props.match.params.card_UN}`;}}
        >
          전체글
        </Button>
          </div>

          <div className="comment_window_d">
            <Paper className="comment_window" elevation={0}>
              <Typography variant="h1"> 댓글자리</Typography>
              {/* <PreandNextPost
                postage_key={this.props.match.params.postage_key}
                board_key={this.props.match.params.board_key}
                board_name={this.state.board_name_eng}
              /> */}
            </Paper>
          </div>
          <div className="cardpost_view_bottommenu">
          <BottomMenu/>
          </div>
        </div>
      </div>
    )}
    }
}
export default CardPost_View;