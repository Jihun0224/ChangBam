import React, { Component } from "react";
import Img from "./dongali.png";
import Comments from "../marketmain/comment";
import Userimg from "../marketmain/doctor.png";
import "./dongali.css";
class Dongali extends Component {
  render() {
    return (
      <div>
        <div className="dongali_title">
          <p>미리별에서 부원을 구하고 있어요~</p>
        </div>
        <div className="dongali_picture">
          <img src={Img} alt="" width="800px" />
        </div>
        <div className="user_nickname">
          <div className="user_img">
            <img src={Userimg} alt="" />
          </div>
          <div className="user_name_part">
            <p>어리고착한콩</p>
          </div>
        </div>
        <div className="dongali_body2">
          <div className="dongali_body_text">
            <span>
              안녕하세요 미리별이에요 마음에 같이 맞는 친구들을 뽑고있으니깐
              마음대로 지원해보세요~
            </span>
          </div>
        </div>
        <div className="comment_div">
          <div className="comment_title">
            <p>댓글 창</p>
          </div>
          <Comments />
          <Comments />
          <Comments />
          <div className="recomment_input">
            <label>댓글 쓰기</label>
            <input type="text" placeholder="댓글을 입력하세요" />
          </div>
        </div>
      </div>
    );
  }
}

export default Dongali;
