import React, { Component } from "react";
import TopAppBar from "./appbar/appbar";
import "./home.css";
import Paper from "@material-ui/core/Paper";
import MainTopPostage from "./maincenterpostage";
import Changwonmenu from "./changwonmenu/changwon";
import Search from "./SearchBar/min";
import Weather from './weather/weather';
import BottomMenu from './bottommenu/bottommenu';
class Home extends Component {

  render() {
    return (
      <div className="Home">
        <TopAppBar />
        <div className="searchbox">
          <Search />
        </div>
        <span className="home_weather">
        <Weather/>
        </span>

        <div className="home_body">
        <div className="Shortcuts">
            <Changwonmenu />
          </div>
          <div className="home_paper">
            <MainTopPostage />           
          </div>
          
          <BottomMenu/>
          
        </div>
        
              
      </div>
    );
  }
}

export default Home;
