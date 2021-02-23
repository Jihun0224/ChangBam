import React, { Component } from 'react';
import Top_AppBar from '../../../appbar/appbar';
import '../../../home2.css';
import Search from '../../../SearchBar/searchbar';
import NestedList from '../../../menulist/Board_list';
import RoomWrite from './roomwrite';

class RoomWriteMain extends React.Component{
    render(){
        return(
            <div>
                <Top_AppBar/>
                <div className="toptop">

                </div>
                <div className="midmid">
                    <Search/>
                </div>
                <div className="bmbm">
                   <RoomWrite/>
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

export default RoomWriteMain;