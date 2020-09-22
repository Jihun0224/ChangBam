import React from "react";
import Mail from "../facebook.png";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import "./chat.css";
import { withStyles } from "@material-ui/core/styles";
import person from "../person/doctor.png";
import TextField from "@material-ui/core/TextField";
import thumb from "./like.png";
import ScrollToBottom from "react-scroll-to-bottom";
import Emoji from "./emoji";

const style = {
  paper: {
    height: "auto",
    width: "auto",
  },
};
class Chattingpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      chat: "",
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleopen = this.handleopen.bind(this);
    this.keyboard = this.keyboard.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({
      chat: e.target.value,
    });
    console.log(this.state.chat);
  }
  keyboard(e) {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      console.log(`엔터키누름 :  ${this.state.chat}`); //여기서 전송
    }
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
    const { handleClose, handleopen, keyboard, onChange } = this;
    return (
      <div>
        <div id="chat">
          <IconButton color="inherit" onClick={handleopen}>
            <img alt="" src={Mail} height="30px" width="30px" />
          </IconButton>
        </div>
        <div className="chatting_paper">
          <Popover
            id={this.state.open ? "simple-popover" : undefined}
            open={Boolean(this.state.anchorEl)}
            anchorEl={this.state.anchorEl}
            onClose={handleClose}
            classes={{ paper: this.props.classes.paper }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: 50,
              horizontal: 630,
            }}
          >
            <div className="main">
              <div className="_chat">
                <img alt="" src={person} height="40px" width="40px" />
                <div className="_chat_title">
                  <p>어린콩</p>
                </div>
              </div>
              <ScrollToBottom
                className="chat_scroll"
                scrollViewClassName="chat_hover"
              >
                <div classes="_chat_on">
                  <div className="chat_img">
                    <img alt="" src={person} height="30px" width="30px" />
                  </div>
                  <div className="cloud">
                    <pre>
                      안녕하세요 물건보고 연락드렸습니다 ㅎㅎ asdasdasdasdasd
                      asdasdasd
                    </pre>
                  </div>
                </div>
                <div classes="_chat_me">
                  <div className="cloud_me">
                    <pre>아 넵 ㅎㅎ 무슨 물건보고 오셨나요 ? ㅋㅋㅋ</pre>
                  </div>
                </div>
                <div classes="_chat_on">
                  <div className="chat_img">
                    <img alt="" src={person} height="30px" width="30px" />
                  </div>
                  <div className="cloud">
                    <pre>동물의 숲 싸게판다고 하셔서 연략했어용</pre>
                  </div>
                </div>
                <div classes="_chat_me">
                  <div className="cloud_me">
                    <pre>아 넵 ㅎㅎ 무슨 물건보고 오셨나요 ? ㅋㅋㅋ</pre>
                  </div>
                </div>
                <div classes="_chat_on">
                  <div className="chat_img">
                    <img alt="" src={person} height="30px" width="30px" />
                  </div>
                  <div className="cloud">
                    <pre>동물의 숲 싸게판다고 하셔서 연략했어용</pre>
                  </div>
                </div>
              </ScrollToBottom>
              <div className="bottommenu">
                <label>입력</label>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="입력하세요."
                  onKeyDown={keyboard}
                  onChange={onChange}
                  value={this.state.chat}
                />
                <Emoji />
                <IconButton color="inherit" size="small">
                  <img alt="" src={thumb} width="28px" height="28px" />
                </IconButton>
              </div>
            </div>
          </Popover>
        </div>
      </div>
    );
  }
}

export default withStyles(style)(Chattingpage);
