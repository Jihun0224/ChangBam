import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './marcketcard.css';

function Border_Love_Button(props) {
    return (
       
        <IconButton className="marketheart"  onClick={props.onClick}><FavoriteBorderIcon/></IconButton>
        );
  }
  
  function Love_Button(props) {
    return (
        
        <IconButton className="marketheart" color="secondary"  onClick={props.onClick}><FavoriteIcon/></IconButton>
    );
  }

  function Love_Button_Check(props) {
    if (props.like === true) {
      return < Love_Button onClick ={props.onClick}/>  //빈하트이면 빨간하트로 변경
    }
    else{
      return < Border_Love_Button onClick ={props.onClick}/>
    }
  }

class Love_button extends Component {
    render() {

      return (
        <Love_Button_Check onClick={this.props.onClick} like={this.props.like}/>
      );
    }
  }

  export default Love_button;