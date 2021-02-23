import React, { Component } from 'react';
import Top_AppBar from '../../appbar/appbar';
import MarcketCard from '../market/marketcard/marcketcard';
import '../../home2.css';
import Search from '../../SearchBar/searchbar';
import NestedList from '../../menulist/Board_list';
import RoomGird from '../gridcard/gridr';
import Button from '@material-ui/core/Button';


class Room extends React.Component{
    render(){
        return(
            <div>
                <Top_AppBar/>
                <div className="toptop">
                    <div>
                        <p>자취방 마켓</p>
                    </div>
                </div>
                <div className="midmid">
                    <Search/>
                </div>
                <div className="bmbm">
                    <Button variant="outlined" color="primary" id="room_button" href="/roomwrite">방내놓기</Button>
                    <RoomGird/>
                </div>
                <div className="cdcd">
                   
                </div>
                <div className="menubarbar">
                <NestedList/>
                </div>
            </div>
        )
    }
}

export default Room;