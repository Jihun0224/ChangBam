import React from "react";
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Popover from "@material-ui/core/Popover";
import Person1 from "./person/avatar.png";
import Person2 from "./person/doctor.png";
import Person3 from "./person/photographer.png";
import "./modal.css";

class Notimodal extends React.Component {
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
          <IconButton color="inherit" onClick={handleopen}>
            <NotificationsIcon />
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
            <div className="scroll_top_alarm">
              <p>알 림</p>
            </div>
            <div className="scroll_email">
              <div className="alarm_user">
                <img alt="" src={Person1} height="30px" width="30px" />
                <div className="ready">
                  <div className="user_name">
                    <span>익명 님이 댓글을 달았습...</span>
                  </div>
                  <div className="user_talk">
                    <span>ㄹㅇㅋㅋ 믿고있었지 ㄹㅇ</span>
                  </div>
                </div>
              </div>
              <div className="alarm_user">
                <img alt="" src={Person2} height="30px" width="30px" />
                <div className="ready">
                  <div className="user_name">
                    <span>휘제는정말멋져 님이 댓글을..</span>
                  </div>
                  <div className="user_talk">
                    <span>컴공은 오지마라 머리빠진다..</span>
                  </div>
                </div>
              </div>
              <div className="alarm_user">
                <img alt="" src={Person3} height="30px" width="30px" />
                <div className="ready">
                  <div className="user_name">
                    <span>최고학점c+님이 댓글을...</span>
                  </div>
                  <div className="user_talk">
                    <span>코로나라서 너무심심하네...</span>
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

export default Notimodal;
