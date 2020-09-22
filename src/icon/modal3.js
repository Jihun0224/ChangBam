import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Favorite from "@material-ui/icons/Favorite";
import Popover from "@material-ui/core/Popover";
import Heart from "./heart.png";
import Like1 from "./like/meeting.png";
import Like2 from "./like/moon.png";
import Like3 from "./like/real-estate.png";
import Like4 from "./like/sale.png";
import Like5 from "./like/school.png";
import "./modal.css";

class Favormodal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paper: "",
      anchorEl: null,
      open: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleopen = this.handleopen.bind(this);
  }

  handleClose(e) {
    this.setState({
      anchorEl: null,
    });
  }

  handleopen(e) {
    this.setState({
      anchorEl: e.currentTarget,
      open: Boolean(e.currentTarget),
    });
  }
  render() {
    const { handleClose, handleopen } = this;
    return (
      <div className="mainemail">
        <div className="emailbutton">
          <IconButton color="secondary" onClick={handleopen}>
            <Favorite />
          </IconButton>
        </div>
        <div className="emailp">
          <Popover
            id={this.state.open ? "simple-popover" : undefined}
            open={Boolean(this.state.anchorEl)}
            anchorEl={this.state.anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <div className="scroll_top_heart">
              <p>좋 아 요</p>
              <div id="chat">
                <img alt="" src={Heart} height="30px" width="30px" />
              </div>
            </div>
            <div className="scroll_email">
              <div className="like_user">
                <img alt="" src={Like1} height="30px" width="30px" />
                <div className="ready">
                  <div className="user_name">
                    <span>동아리 게시판 </span>
                  </div>
                  <div className="user_talk">
                    <span>컴퓨터공학과 학과동...</span>
                    <span className="day">(최근 1일)</span>
                  </div>
                </div>
              </div>
              <div className="like_user">
                <img alt="" src={Like2} height="30px" width="30px" />
                <div className="ready">
                  <div className="user_name">
                    <span>익명게시판</span>
                  </div>
                  <div className="user_talk">
                    <span>아 ㄹㅇ 재미는썰들려..</span>
                    <span className="day">(최근 1일)</span>
                  </div>
                </div>
              </div>
              <div className="like_user">
                <img alt="" src={Like3} height="30px" width="30px" />
                <div className="ready">
                  <div className="user_name">
                    <span>자취방게시판</span>
                  </div>
                  <div className="user_talk">
                    <span>2학기에 양도합니다~...</span>
                    <span className="day">(최근 3일)</span>
                  </div>
                </div>
              </div>
              <div className="like_user">
                <img alt="" src={Like4} height="30px" width="30px" />
                <div className="ready">
                  <div className="user_name">
                    <span>장터게시판</span>
                  </div>
                  <div className="user_talk">
                    <span>닌텐도 스위치 s급 싸게...</span>
                    <span className="day">(최근 4일)</span>
                  </div>
                </div>
              </div>
              <div className="like_user">
                <img alt="" src={Like5} height="30px" width="30px" />
                <div className="ready">
                  <div className="user_name">
                    <span>진로취업게시판</span>
                  </div>
                  <div className="user_talk">
                    <span>컴공과졸업한 아재다 열...</span>
                    <span className="day">(최근 7일)</span>
                  </div>
                </div>
              </div>
            </div>
          </Popover>
        </div>
      </div>
    );
  }
}

export default Favormodal;
