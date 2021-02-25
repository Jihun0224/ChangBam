import React from "react";
import TopAppBar from "../appbar/appbar";
import Postbody from "../postage/postbody";
import "./board.css";
import Search from "../SearchBar/searchbar";
import NestedList from "../menulist/Board_list";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import BottomMenu from '../bottommenu/bottommenu';
import { Typography } from "@material-ui/core";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board_key: "",
      board_name: "",
    };
  }

  componentWillMount() {
    const { params } = this.props.match;

    switch (params.board_name) {
      case "free":
        this.setState({ board_name: "자유게시판", board_key: 0 });
        break;
      case "anonymous":
        this.setState({ board_name: "익명게시판", board_key: 1 });
        break;
      case "new":
        this.setState({ board_name: "새내기게시판", board_key: 2 });
        break;
      case "love":
        this.setState({ board_name: "연애게시판", board_key: 3 });
        break;
      case "politic":
        this.setState({ board_name: "정치게시판", board_key: 4 });
        break;
      case "night":
        this.setState({ board_name: "창밤 공지사항", board_key:5 });
        break;
      case "changwon":
        this.setState({ board_name: "학교 공지사항", board_key: 6 });
        break;
      case "study":
        this.setState({board_name: "스터디그룹", board_key:7});
        break;
      case "old":
        this.setState({board_name:"졸업생게시판", board_key:8})
        break;
      case "EmploymentReview":
        this.setState({board_name:"취업게시판", board_key:9})
        break;
      case "EmploymentAnnouncement":
        this.setState({board_name:"채용공고", board_key:10})
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <div className="board">
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
          <Postbody board_key={this.state.board_key} />
        </div>

      
        <div className="postage_write_button">
          <Button id="write" variant="contained" color="primary">
            <Link to={`/${this.props.match.params.board_name}/postage_write`}>
              <font color="white">글쓰기</font>
            </Link>
          </Button>
        
        </div>
        <div className="boardBottomMenu">
        <BottomMenu/>
        </div>
      </div>
      
    );
  }
}

export default Board;
