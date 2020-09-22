import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import "./changwon.css";
import Fade from "@material-ui/core/Fade";
import { withStyles } from "@material-ui/core/styles";
const style = {
  paper: {
    top: 400,
  },
};
class Changwonmenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.gowaagle = this.gowaagle.bind(this);
    this.goeclass = this.goeclass.bind(this);
  }
  handleClick(e) {
    this.setState({
      anchorEl: e.currentTarget,
    });
  }
  handleClose(e) {
    this.setState({
      anchorEl: null,
    });
  }
  gowaagle(e) {
    window.open(
      "http://portal.changwon.ac.kr/portalMain/main.do?homecd=portal"
    );
  }
  goeclass(e) {
    window.open("http://eclass.changwon.ac.kr/Main.do?cmd=viewHome");
  }
  render() {
    return (
      <div>
        <div className="changwonmenu">
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="outlined"
            color="primary"
            onClick={this.handleClick}
          >
            사이트 바로가기
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            keepMounted
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose}
            TransitionComponent={Fade}
            className={this.props.classes.paper}
            transformOrigin={{
              vertical: -50,
              horizontal: -5,
            }}
          >
            <MenuItem onClick={this.gowaagle}>창원대 와글</MenuItem>
            <hr />
            <MenuItem onClick={this.goeclass}>창원대 이클래스</MenuItem>
          </Menu>
        </div>
      </div>
    );
  }
}

export default withStyles(style)(Changwonmenu);
