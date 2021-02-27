import React from "react";
import { Route,Switch } from "react-router-dom";
import Home from "./Home";
import Meeting_home from "./meeting/meeting_home";
import Postage_write from "./postage_write/postage_write";
import Postage_modify from "./postage_write/postage_modify";
import View_Post from "./postage/view_post";
import ScrollToTop from "./ScrollToTop";
import Board from "./board/board";
import NoneExist from './NoneExist/noneexist';
//수정 필요
import Alba from "./alba";

//수정 중
import CardBoard from "./card_board/card_board";
import Card_View from "./card_board/cardpost_view";
import Club_write from "./card_board/club_write/club_write";
import Roommarket_write from "./card_board/roommarket_write/roommarket_write";
import ChangbamMarket_write from "./card_board/changbammarket_write/changbammarket_write";
import Club_modify from "./card_board/club_write/club_modify";

function App() {  
  return (
      <Switch>
      <ScrollToTop>
        
        <Route exact path="/alba" component={Alba} />
        <Route exact path="/meeting" component={Meeting_home} />

        
        <Route exact path="/" component={Home} />
        <Route exact path="/NoneExist" component={NoneExist} />
        <Route exact path="/club/card_write" component={Club_write} />        
        <Route exact path="/roomMarket/card_write" component={Roommarket_write} />        
        <Route exact path="/changbamMarket/card_write" component={ChangbamMarket_write} />        
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
