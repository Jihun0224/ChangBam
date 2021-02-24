import React from "react";
import TopAppBar from "../appbar/appbar";
import CardPostBody from "./card_postbody";
import "./card_board.css";
import Search from "../SearchBar/searchbar";
import NestedList from "../menulist/Board_list";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import BottomMenu from '../bottommenu/bottommenu';
import { Typography } from "@material-ui/core";

class CardBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board_name: "",
    };
  }

  componentWillMount() {
    const { params } = this.props.match;

    switch (params.board_name) {
      case "club":
        this.setState({ board_name: "동아리홍보"});
        break;
      case "ChangbamMarket":
        this.setState({ board_name: "창밤인 마켓"});
        break;
      case "RoomMarket":
        this.setState({ board_name: "자취방 마켓"});
        break;
      default:
        this.props.history.replace('/NoneExist');
        break;
    }
  }
  render() {
    return (
      <div className="cardboard">
        <TopAppBar />
        <div className="board_title">
          <Typography variant="h3"> {this.state.board_name}</Typography>
        </div>
        <div className="searchbar">
          <Search />
        </div>
        <div className="menubarbar">
          <NestedList />
        </div>
        <div className="postbody">
          <CardPostBody card_UN={this.props.match.params.card_UN} />
        </div>

      
        <div className="postage_write_button">
          <Button id="write" variant="contained" color="primary">
            <Link to={`/${this.props.match.params.board_name}/card_write`}>
              <font color="white">글쓰기</font>
            </Link>
          </Button>
        
        </div>
        <div className="cardboardBottomMenu">
        <BottomMenu/>
        </div>
      </div>
      
    );
  }
}

export default CardBoard;
