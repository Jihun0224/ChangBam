import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Popover from "@material-ui/core/Popover";
import "./appbar.css";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const styles = {
  paper: {
    height: "auto",
    width: "auto",
  },
};
class CampusMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorRef: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleListKeyDown = this.handleListKeyDown.bind(this);
  }
  handleToggle(e) {
    this.setState({
      open: (prevOpen) => !prevOpen,
    });
  }
  handleListKeyDown(e) {
    if (e.key === "Tab") {
      e.preventDefault();
      this.setState({
        open: false,
      });
    }
  }
  handleClose(e) {
    if (this.state.anchorRef && this.state.anchorRef.contains(e.target)) {
      return;
    }

    this.setState({
      open: false,
    });
  }
  handleClick(e) {
    this.setState({
      anchorEl: e.currentTarget,
      open: true,
    });
  }
  render() {
    const { handleClose, handleListKeyDown, handleClick } = this;
    return (
      <div className="campus">
        <Button
          ref={this.state.anchorRef}
          aria-describedby={this.state.open ? "simple-popover" : undefined}
          onClick={handleClick}
        >
          캠퍼스
        </Button>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          id={this.state.open ? "simple-popover" : undefined}
          onClose={handleClose}
          classes={{ paper: this.props.classes.paper }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          {" "}
          <div className="menu_paper">
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={this.state.open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem>
                    <Link to="/study">스터디그룹</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/club">동아리홍보</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/meeting">과팅</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>학식표</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </div>
        </Popover>
      </div>
    );
  }
}

export default withStyles(styles)(CampusMenu);
