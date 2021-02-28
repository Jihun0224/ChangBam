import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import React from "react";
import { Link } from "react-router-dom";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FavoriteIcon from "@material-ui/icons/Favorite";
import VisibilityIcon from "@material-ui/icons/Visibility";
import "./pre_and_next_post.css";

class Pre_and_next_post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pre_post: [],
      next_post: [],
    };
  }

  componentWillMount() {
    const post = {
      postage_key: this.props.postage_key,
      board_key: this.props.board_key,
    };
    fetch("http://localhost:3001/api/pre_and_next_post", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      //1이 이전 0이 다음
      
      .then((res) => {
        if(res[1] == undefined){
          this.setState({pre_post: res[0],next_post: undefined});
        }
        else{
          this.setState({ next_post: res[0] ,pre_post: res[1]});
        }
      });
      
  }

  render() {
    const { next_post, pre_post } = this.state;

    return (
      <div className="pre_and_next_post">
        <Paper className= "pre_and_next_post_paper"elevation = {0} square={false}>
        <TableContainer>
          <Table>
            <TableBody>
              {pre_post == undefined && (
                <TableRow className="NextOrPreNoneExistTR">
                  <TableCell className="NextOrPreNoneExist" width="150px">
                    이전글이 없습니다
                  </TableCell>
                </TableRow>
              )}

              {pre_post !== undefined && (
                <TableRow className="NextOrPreExistTR">
                  <TableCell
                    onClick={() => window.location.reload()}
                    className="NextOrPreExist_nextorpre"
                  >
                    <Link
                      to={`/${this.props.board_name}/view/id=${pre_post.postage_key}&board=${this.props.board_key}`}
                    >
                      이전 글<ArrowDropUpIcon className="arrowButton"/>
                    </Link>
                  </TableCell>
                  <TableCell
                    onClick={() => window.location.reload()}
                    className="NextOrPreExist_title"
                  >
                    <Link
                      to={`/${this.props.board_name}/view/id=${pre_post.postage_key}&board=${this.props.board_key}`}
                    >
                      {pre_post.postage_title}
                    </Link>
                    <font color="#006CB7"> [{pre_post.postage_comment}]</font>
                  </TableCell>
                  <TableCell className="NextOrPreExist_nickname">
                    {pre_post.user_nickname}
                  </TableCell>
                  <TableCell className="NextOrPreExist_like">
                    <FavoriteIcon color="secondary" />
                    {pre_post.postage_love}
                  </TableCell>
                  <TableCell className="NextOrPreExist_date">
                    {pre_post.post_date}
                  </TableCell>
                  <TableCell className="NextOrPreExist_views">
                    <VisibilityIcon className="viewIcon"/>
                    {pre_post.postage_views}
                  </TableCell>
                </TableRow>
              )}

              {next_post === undefined && (
                <TableRow className="NextOrPreNoneExistTR">
                  <TableCell className="NextOrPreNoneExist" width="150px">
                    다음글이 없습니다
                  </TableCell>
                </TableRow>
              )}
              {next_post !== undefined && (
                <TableRow className="NextOrPreExistTR">
                  <TableCell
                    onClick={() => window.location.reload()}
                    className="NextOrPreExist_nextorpre"
                  >
                    <Link
                      to={`/${this.props.board_name}/view/id=${next_post.postage_key}&board=${this.props.board_key}`}
                    >
                      다음 글<ArrowDropDownIcon className="arrowButton"/>
                    </Link>
                  </TableCell>
                  <TableCell
                    onClick={() => window.location.reload()}
                    className="NextOrPreExist_title"
                  >
                    <Link
                      to={`/${this.props.board_name}/view/id=${next_post.postage_key}&board=${this.props.board_key}`}
                    >
                      {next_post.postage_title}
                    </Link>
                    <font color="#006CB7"> [{next_post.postage_comment}]</font>
                  </TableCell>
                  <TableCell className="NextOrPreExist_nickname">
                    {next_post.user_nickname}
                  </TableCell>
                  <TableCell className="NextOrPreExist_like">
                    <FavoriteIcon color="secondary" />
                    {next_post.postage_love}
                  </TableCell>
                  <TableCell className="NextOrPreExist_date">
                    {next_post.post_date}
                  </TableCell>
                  <TableCell className="NextOrPreExist_views">
                    <VisibilityIcon className="viewIcon"/>
                    {next_post.postage_views}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
      </div>
    );
  }
}

export default Pre_and_next_post;
