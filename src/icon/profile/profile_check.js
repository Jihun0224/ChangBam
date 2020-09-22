import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import "./profile.css";
import Button from "@material-ui/core/Button";
import Profilechange from "./profile_c";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Passwordchange from "./password";
import Withdrawal from "./Withdrawal";

// import Passwordchange from './password';

class Profile_check extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile_image: "",
      id: "",
      nickname: "",
      email: "",
      anchorEl: null,
      open: false,
      open_pwd: false,
      open_wd: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleopen = this.handleopen.bind(this);
    this.handleClose_pwd = this.handleClose_pwd.bind(this);
    this.handleopen_pwd = this.handleopen_pwd.bind(this);
    this.handleClose_wd = this.handleClose_wd.bind(this);
    this.handleopen_wd = this.handleopen_wd.bind(this);
  }
  componentWillMount() {
    console.log(JSON.parse(localStorage.getItem("user")));
    this.setState({
      // profile_image: JSON.parse(contact.)
      id: JSON.parse(localStorage.getItem("user")).id,
      nickname: JSON.parse(localStorage.getItem("user")).nickname,
    });
    const post = {
      id: JSON.parse(localStorage.getItem("user")).id,
    };
    fetch("api/GetProfile", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          profile_image: json[0].user_profile_image,
        });
      });
  }
  handleClose(e) {
    this.setState({
      open: false,
    });
  }
  handleopen(e) {
    this.setState({
      open: true,
    });
  }
  handleClose_pwd(e) {
    this.setState({
      open_pwd: false,
    });
  }
  handleopen_pwd(e) {
    this.setState({
      open_pwd: true,
    });
  }
  handleClose_wd(e) {
    this.setState({
      open_wd: false,
    });
  }
  handleopen_wd(e) {
    this.setState({
      open_wd: true,
    });
  }
  render() {
    const { handleopen, handleopen_wd, handleClose_pwd, handleopen_pwd } = this;
    const { id, nickname, open_pwd, open_wd } = this.state;
    let url =
      "https://s3.ap-northeast-2.amazonaws.com/cu-night/" +
      this.state.profile_image;
    return (
      <div>
        <Card className="profile_card">
          <CardMedia className="profile_image" image={url} />
          <CardContent>
            <div className="nickname_and_statemessage">
              <Typography variant="h5">{id}</Typography>
              <Typography gutterBottom variant="subtitle1">
                {nickname}
              </Typography>
            </div>
            <div className="profile_info">
              <hr />
              <br />
              <Button className="profile_body" onClick={handleopen}>
                작성글
              </Button>
              <Button
                className="profile_body"
                onClick={handleopen}
                text-align="left"
              >
                작성댓글
              </Button>
              <Button
                className="profile_body"
                onClick={handleopen}
                align="left"
              >
                댓글단 글
              </Button>
              <Button
                className="profile_body"
                onClick={handleopen}
                align="left"
              >
                좋아요한 글
              </Button>
              <Button
                className="profile_body"
                onClick={handleopen_pwd}
                align="left"
              >
                비밀번호 수정
              </Button>
              <Button
                className="profile_body"
                onClick={handleopen_wd}
                align="left"
              >
                회원탈퇴
              </Button>
            </div>
          </CardContent>

          <div className="profile_button">
            <Dialog
              open={this.state.open}
              aria-labelledby="form-dialog-title"
              className="profile_change_button"
            >
              <DialogContent>
                <Profilechange profile={this.state.profile_image} />
              </DialogContent>
              <DialogActions>
                <Button
                  className="cancel"
                  variant="outlined"
                  color="primary"
                  onClick={this.handleClose}
                >
                  닫기
                </Button>
              </DialogActions>
            </Dialog>
            <Button
              className="modify"
              variant="contained"
              color="primary"
              onClick={handleopen}
            >
              수정
            </Button>
          </div>

          <div className="profile_button">
            <Dialog open={open_pwd}>
              <DialogContent>
                <Passwordchange />
                <Button onClick={handleClose_pwd} color="primary">
                  취소
                </Button>
              </DialogContent>
            </Dialog>
          </div>
          <Dialog open={open_wd}>
            <DialogContent>
              <Withdrawal />
              <Button onClick={this.handleClose_wd} color="primary">
                취소
              </Button>
            </DialogContent>
          </Dialog>
        </Card>
      </div>
    );
  }
}

export default Profile_check;
