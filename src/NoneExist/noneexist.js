import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import './noneexist.css';

class NoneExist extends Component{
    render(){
        return(
            <div className="NoneExist">
            <Typography className= "NoneExist_title" variant="h3">존재하지 않는 페이지 입니다. </Typography>
            <Button id ="goBack_button"variant="outlined" color="primary" onClick={ () => {this.props.history.goBack()}}> 이전페이지</Button>
            </div>
        );
    }
}
export default NoneExist;