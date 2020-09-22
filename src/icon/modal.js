import React from "react";
import Badge from "@material-ui/core/Badge";
import Chattingpage from "./chatting/chat";
import IconButton from "@material-ui/core/IconButton";
import MailIcon from "@material-ui/icons/Mail";
import Popover from "@material-ui/core/Popover";
import "./modal.css";
import Person1 from "./person/avatar.png";
import Person2 from "./person/doctor.png";
import Person3 from "./person/photographer.png";
import Person4 from "./person/profile.png";
import Person5 from "./person/sailor.png";
class Emailmodal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
          <IconButton color="inherit" onClick={handleopen}>
            <Badge badgeContent={4} color="primary">
              <MailIcon />
            </Badge>
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
            <div className="scroll_top">
              <p>메 세 지</p>
              <Chattingpage />
            </div>
            <div className="scroll_email">
              <div className="message_user">
                <img alt="" src={Person1} height="30px" width="30px" />
                <div className="ready">
                  <div className="user_name">
                    <span>어린콩</span>
                  </div>
                  <div className="user_talk">
                    <span>머하노 ㄹㅇㅋㅋ</span>
                  </div>
                </div>
              </div>
              <div className="message_user">
                <img alt="" src={Person2} height="30px" width="30px" />
                <div className="ready">
                  <div className="user_name">
                    <span>손용용이(2)</span>
                  </div>
                  <div className="user_talk">
                    <span>과제 다했나?</span>
                  </div>
                </div>
              </div>
              <div className="message_user">
                <img alt="" src={Person3} height="30px" width="30px" />
                <div className="ready">
                  <div className="user_name">
                    <span>민처리(1)</span>
                  </div>
                  <div className="user_talk">
                    <span>핵팔아요</span>
                  </div>
                </div>
              </div>
              <div className="message_user">
                <img alt="" src={Person4} height="30px" width="30px" />
                <div className="ready">
                  <div className="user_name">
                    <span>민정쨩</span>
                  </div>
                  <div className="user_talk">
                    <span>숡?</span>
                  </div>
                </div>
              </div>
              <div className="message_user">
                <img alt="" src={Person5} height="30px" width="30px" />
                <div className="ready">
                  <div className="user_name">
                    <span>귀여운지훈이(1)</span>
                  </div>
                  <div className="user_talk">
                    <span>어또캐오또캐</span>
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

export default Emailmodal;
