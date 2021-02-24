import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
function BorderLoveButton(props) {
  return (
    <IconButton color="secondary" onClick={props.onClick}>
      <FavoriteBorderIcon />
    </IconButton>
  );
}

function LoveButton(props) {
  return (
    <IconButton color="secondary" onClick={props.onClick}>
      <FavoriteIcon />
    </IconButton>
  );
}
function LoveButtonCheck(props) {
  if (props.love_state === true) {
    return <LoveButton onClick={props.onClick} />;
  } else {
    return <BorderLoveButton onClick={props.onClick} />;
  }
}

class Lovebutton extends Component {
  render() {
    return (
      <LoveButtonCheck
        onClick={this.props.onClick}
        love_state={this.props.love_state}
      />
    );
  }
}

export default Lovebutton;
