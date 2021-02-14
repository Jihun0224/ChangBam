import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Login from "../main/login";
import "./icon.css";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Emailmodal from "./modal";
import Notimodal from "./modal2";
import Favormodal from "./modal3";
import ProfileCheck from "./profile/profile_check";
import AccountCircle from "@material-ui/icons/AccountCircle";

class Switchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      open2: false,
      checklogin: false,
      email: false,
      anchorEl: null,
      mobileMoreAnchorEl: null,
      auth: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.authsubmit = this.authsubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClose2 = this.handleClose2.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
  }
  componentDidMount() {
    this.setState({
      open: this.props.open,
      checklogin: this.props.checklogin,
      auth: this.props.auth,
    });
  }
  handleChange(e) {
    if (this.state.auth === true) {
      this.setState({
        checklogin: false,
        open: false,
        auth: false,
      });
      localStorage.clear();
      console.log(localStorage.getItem("admin"));
    } else {
      this.setState({
        //여기에 로그인
        checklogin: true,
        open: true,
      });
      localStorage.setItem("admin", false);
    }
  }
  handleChange2(e) {
    this.setState({
      auth: true,
    });
  }

  handleClose(e) {
    this.setState({
      open: false,
      checklogin: false,
    });
  }
  authsubmit(auth2) {
    this.setState({
      auth: auth2,
    });
  }
  handleClickOpen() {
    this.setState({
      open2: true,
    });
  }
  handleClose2() {
    this.setState({
      open2: false,
    });
  }
  render() {
    return (
      <div>
        <FormGroup aria-label="position" row>
          <FormControlLabel
            control={
              <Switch
                checked={this.state.auth}
                onChange={this.handleChange}
                aria-label="login switch"
              />
            }
            label={this.state.auth ? "Logout" : "Login"}
          />
          {this.state.auth && (
            <div className="menuicon">
              <IconButton color="inherit" onClick={this.handleClickOpen}>
                <AccountCircle />
              </IconButton>
              <Dialog
                open={this.state.open2}
                onClose={this.handleClose2}
                aria-labelledby="form-dialog-title"
                className="profile_check_button"
              >
                <DialogContent>
                  <ProfileCheck />
                </DialogContent>
                <DialogActions>
                  <Button
                    className="cancel"
                    variant="outlined"
                    color="primary"
                    onClick={this.handleClose2}
                  >
                    닫기
                  </Button>
                </DialogActions>
              </Dialog>
              <Favormodal />
              <Emailmodal />
              <Notimodal />
            </div>
          )}
        </FormGroup>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <Login
              auth={this.state.auth}
              authsubmit={this.authsubmit}
              handleClose={this.handleClose}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
export default Switchbar;
