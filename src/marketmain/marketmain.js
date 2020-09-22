import React, { Component } from "react";
import Left from "./return.png";
import Right from "./next.png";
import IconButton from "@material-ui/core/IconButton";
import Jgo from "./jgo.jpg";
import Userimg from "./username.png";
import Sold from "./sold-out.png";
import Love from "./lovelike.png";
import Comments from "./comment";
import "./marketmain.css";

class Marketbody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      nickname: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const post = {
      comment: this.state.comment,
      nickname: JSON.parse(localStorage.getItem("user")).nickname,
    };
    fetch("api/comment", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    });
  }
  commentData(body) {
    return { body };
  }

  render() {
    const comment_row = [this.commentData(<Comments />)];
    const { comment } = this.state;
    const { onSubmit, onChange } = this;
    return (
      <div className="marketbody">
        <div className="img_button1">
          <IconButton>
            <img alt="" src={Right} width="30px" height="30px" />
          </IconButton>
        </div>
        <div className="img_button2">
          <IconButton>
            <img alt="" src={Left} width="30px" height="30px" />
          </IconButton>
        </div>
        <div className="market_img">
          <img alt="" src={Jgo} width="500px" height="400px" />
        </div>
        <div className="user_nickname">
          <div className="user_img">
            <img alt="" src={Userimg} />
          </div>
          <div className="user_name_part">
            <p>어리고착한콩</p>
          </div>
          <div className="soldout">
            <p>sold out</p>
          </div>
        </div>
        <div className="market_title">
          <p>노트북 정말 싸게 팝니다 네고 안됩니다~ 너무싸게 팔아서요</p>
          <p>140,000원</p>
          <div className="market_body_text">
            <span>
              이모자전거 팔아요 밖에서 사용한거라 사용감 있습니다 특별히
              찢어지거나 깨진곳은 없습니다
            </span>
          </div>
        </div>
        <div className="love_this">
          <span>찜하기</span>
          <IconButton>
            <img alt="" src={Love} />
          </IconButton>
        </div>
        <div className="comment_div">
          <div className="comment_title">
            <p>댓글 창</p>
          </div>
          <form onSubmit={onSubmit}>
            <div className="recomment_input">
              <label>댓글 쓰기</label>
              <textarea
                placeholder="댓글을 입력하세요."
                name="comment"
                value={comment}
                onChange={onChange}
              />
              <input
                onClick={() => window.location.reload(false)}
                type="submit"
                value="댓글 달기"
              />
            </div>
          </form>
          <Comments />
        </div>
      </div>
    );
  }
}

export default Marketbody;
