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
class ImformationMenu extends Component {
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
      <div className="imformation">
        <Button
          ref={this.state.anchorRef}
          aria-describedby={this.state.open ? "simple-popover" : undefined}
          onClick={handleClick}
        >
          생활정보
        </Button>
        <Popover
          id={this.state.open ? "simple-popover" : undefined}
          open={this.state.open}
          anchorEl={this.state.anchorEl}
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
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={this.state.open}
                id="menu-list-grow"
                onKeyDown={handleListKeyDown}
              >
                <MenuItem>
                  <Link to="market">창밤인 마켓</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="room">자취방 마켓</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="alba">알바창국</Link>
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Popover>
      </div>
    );
  }
}
export default withStyles(styles)(ImformationMenu);
