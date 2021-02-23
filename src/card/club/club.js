import React from 'react';
import Top_AppBar from '../../appbar/appbar';
import './club.css';
import Search from '../../SearchBar/searchbar';
import NestedList from '../../menulist/Board_list';
import Griddongali from '../gridcard/gridd';
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import BottomMenu from '../../bottommenu/bottommenu';

class Club extends React.Component{
  
    
    render(){

        return(
            <div className = "card_postge">
                <Top_AppBar/>
                <div className="board_title">
                <Typography variant="h3">동아리 홍보</Typography>
                </div>
                <div className="searchbar">
                <Search />
                </div>
                <div className="menubarbar">
                <NestedList />
                </div>
                <div className="postbody">
                    <Griddongali/>
                </div>
                <div className="postage_write_button">
                <Button id="write" variant="contained" color="primary">
                    <Link to="/7">
                    <font color="white">글쓰기</font>
                    </Link>
                </Button>
                </div>
                
                <div className="boardBottomMenu">
                <BottomMenu/>
                </div>
            </div>
        )
    }
}

export default Club;