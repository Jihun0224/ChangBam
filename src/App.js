import React from "react";
import { Route,Switch } from "react-router-dom";
import Home from "./Home";
import Alba from "./alba";
import Meeting_home from "./meeting/meeting_home";
import Postage_write from "./postage_write/postage_write";
import Postage_modify from "./postage_write/postage_modify";
import View_Post from "./postage/view_post";
import ScrollToTop from "./ScrollToTop";
import Board from "./board/board";
import NoneExist from './NoneExist/noneexist';
import Appbar from "./appbar/appbar";
//손봐야할거
import Home3 from "./card/market/home3";
import Home4 from "./card/club/home4";
import ChangbamMarketWrite from "./card/market/ChangbamMarketWrite";
import Home8 from "./card/club/home8";
import Roomview from "./card/room/roomview";
import RoomWrite from "./card/room/roomwrite/roomwritemain";
import RoomBody from "./card/room/roombody";
//고치는 중인거
import CardBoard from "./card_board/card_board";
import Card_View from "./card_board/cardpost_view";
import Club_write from "./card_board/club_write/club_write";
import Club_modify from "./card_board/club_write/club_modify";
import Roommarket_write from "./card_board/roommarket_write/roommarket_write";

function App() {  
  return (
      <Switch>
      <ScrollToTop>
        {/* <Route component = {Appbar}/> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/ChangbamMarket/view" component={Home3} />  
        <Route exact path="/3" component={Home4} />
        <Route exact path="/alba" component={Alba} />
        <Route exact path="/ChangbamMarket/postage_write" component={ChangbamMarketWrite} />
        <Route exact path="/7" component={Home8} />
        <Route exact path="/meeting" component={Meeting_home} />
        <Route exact path="/Room" component={Roomview} />
        <Route exact path="/roomwrite" component={RoomWrite} />
        <Route exact path="/roombody" component={RoomBody} />
        <Route exact path="/NoneExist" component={NoneExist} />
        <Route exact path="/test" component={Club_modify} />


        <Route exact path="/club/card_write" component={Club_write} />        
        <Route exact path="/roomMarket/card_write" component={Roommarket_write} />        
        <Route
          exact
          path={`/:board_name/list/card=:card_UN`}
          component={CardBoard}
        />
        <Route
          exact
          path={`/:board_name/view/id=:card_key&card=:card_UN`}
          component={Card_View}
        />
        <Route
          exact
          path={`/:board_name/list/board=:board_key`}
          component={Board}
        />
        <Route
          exact path={`/:board_name/write`}
          component={Postage_write}
        />
        <Route
          exact
          path={`/:board_name/view/id=:postage_key&board=:board_key`}
          component={View_Post}
        />
        <Route
          exact
          path={`/:board_name/view/id=:postage_key&board=:board_key/postage_modify`}
          component={Postage_modify}
        />
      </ScrollToTop>
      </Switch>
  );
}

export default App;
