import React from "react";
import "./icon.css";
import Login from "../main/main";
import Emailmodal from "./modal";
import Notimodal from "./modal2";
import Favormodal from "./modal3";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";
import Profile_check from "./profile/profile_check";
class Icon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      open2: false,
      checklogin: false,
      anchorEl: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleChange(e) {
    if (this.state.auth == true) {
      this.setState({
        checklogin: false,
        open: false,
      });
    } else {
      this.setState({
        //여기에 로그인
        checklogin: true,
        open: true,
      });
    }
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
    const { handleChange } = this;
    return (
      <div className="aaa">
        <div className="cccc">
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
              <Profile_check />
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
        </div>
        <Emailmodal />
        <Notimodal />
        <Favormodal />
        <FormGroup>
          <FormControlLabel
            witdh="100px"
            control={
              <Switch
                checked={this.state.checklogin}
                color="primary"
                onChange={handleChange}
                name="checklogin"
                aria-label="login switch"
              />
            }
            label={this.state.checklogin ? "Logout" : "Login"}
          />
        </FormGroup>
      </div>
    );
  }
}

export default Icon;
