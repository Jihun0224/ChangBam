import React from "react";
import { Route } from "react-router-dom";
import "./app.css";
import Home from "./Home";
import Alba from "./alba";
import Meeting_home from "./meeting/meeting_home";
import Changwon from "./changwon";

import Postage_write from "./postage_write/postage_write";
import Postage_modify from "./postage_write/postage_modify";
import View_Post from "./post/view_post";
import ScrollToTop from "./ScrollToTop";
import Board from "./board";

import Market from "./card/market/market";
import Room from "./card/room/room";
import Club from "./card/club/club";
import Home3 from "./card/market/home3";
import Home4 from "./card/club/home4";
import Home7 from "./card/market/home7";
import Home8 from "./card/club/home8";
import Home9 from "./card/room/home9";
import RoomWrite from "./card/room/roomwrite/roomwritemain";
import RoomBody from "./card/room/roombody";

function App() {
  return (
    <div>
      <ScrollToTop>
        <Route exact path="/" component={Home} />
        <Route exact path="/2" component={Home3} />
        <Route exact path="/3" component={Home4} />
        <Route exact path="/market" component={Market} />
        <Route exact path="/room" component={Room} />
        <Route exact path="/alba" component={Alba} />
        <Route exact path="/club" component={Club} />
        <Route exact path="/6" component={Home7} />
        <Route exact path="/7" component={Home8} />
        <Route exact path="/meeting" component={Meeting_home} />
        <Route exact path="/학교공지사항" component={Changwon} />
        <Route exact path="/9" component={Home9} />
        <Route exact path="/roomwrite" component={RoomWrite} />
        <Route exact path="/roombody" component={RoomBody} />

        <Route
          exact
          path={`/:board_name/list/board=:board_key`}
          component={Board}
        />
        <Route
          exact
          path={`/:board_name/postage_write`}
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
    </div>
  );
}

export default App;
