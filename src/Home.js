import React, { Component } from "react";
import TopAppBar from "./appbar/appbar";
import "./home.css";
import MainTopPostage from "./maintop6postage/maincenterpostage";
import Changwonmenu from "./changwonmenu/changwon";
import Search from "./SearchBar/searchbar";
import Weather from './weather/weather';
import BottomMenu from './bottommenu/bottommenu';
import Covid_19 from './covid_19/covid_19';

class Home extends Component {

  render() {
    return (
      <div className="Home">
        <TopAppBar />
        <div>
        
        </div>
        <div className="searchbox">
          <Search />
        </div>
        
        <div className="home_covid">
        <Covid_19/>
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
          
          <div className="home_bottomemenu">
          <BottomMenu/>
          </div>
          
        </div>
        
              
      </div>
    );
  }
}

export default Home;
