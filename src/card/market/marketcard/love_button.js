import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "./marcketcard.css";

function BorderLoveButton(props) {
  return (
    <IconButton className="marketheart" onClick={props.onClick}>
      <FavoriteBorderIcon />
    </IconButton>
  );
}

function LoveButton(props) {
  return (
    <IconButton
      className="marketheart"
      color="secondary"
      onClick={props.onClick}
    >
      <FavoriteIcon />
    </IconButton>
  );
}

function LoveButtonCheck(props) {
  if (props.like === true) {
    return <LoveButton onClick={props.onClick} />; //빈하트이면 빨간하트로 변경
  } else {
    return <BorderLoveButton onClick={props.onClick} />;
  }
}

class Lovebutton extends Component {
  render() {
    return (
      <LoveButtonCheck onClick={this.props.onClick} like={this.props.like} />
    );
  }
}

export default Lovebutton;
