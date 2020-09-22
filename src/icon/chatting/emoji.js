import React from "react";
import Picker from "react-emojipicker";
import Popover from "@material-ui/core/Popover";
import { withStyles } from "@material-ui/core/styles";
import Emoticon from "./emoji.png";
import IconButton from "@material-ui/core/IconButton";
const style = {
  paper: {
    height: 352,
    width: 342,
  },
};

class Emoji extends React.Component {
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
  logEmoji(e) {
    console.log(e);
  }
  render() {
    return (
      <div className="emoji">
        <Popover
          id={this.state.open ? "simple-popover" : undefined}
          open={Boolean(this.state.anchorEl)}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
          classes={{ paper: this.props.classes.paper }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: 395,
            horizontal: 670,
          }}
        >
          <Picker onEmojiSelected={this.logEmoji.bind(this)} />
        </Popover>
        <IconButton color="inherit" size="small" onClick={this.handleopen}>
          <img alt="" src={Emoticon} width="28px" height="28px" />
        </IconButton>
      </div>
    );
  }
}

export default withStyles(style)(Emoji);
