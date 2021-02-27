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

      .then((res) => {
        this.setState({ pre_post: res[1], next_post: res[0] });
      });
  }

  render() {
    const { next_post, pre_post } = this.state;

    return (
      <div className="pre_and_next_post">
        <Paper elevation = {0}>
        <TableContainer>
          <Table>
            <TableBody>
              {pre_post == undefined && (
                <TableRow className="pre_row_n">
                  <TableCell className="pre_n" width="150px" height="29.6px">
                    이전글이 없습니다
                  </TableCell>
                </TableRow>
              )}

              {pre_post !== undefined && (
                <TableRow>
                  <TableCell
                    onClick={() => window.location.reload()}
                    className="pre_y"
                    width="80px"
                  >
                    <Link
                      to={`/${this.props.board_name}/view/id=${pre_post.postage_key}&board=${this.props.board_key}`}
                    >
                      이전 글<ArrowDropUpIcon />
                    </Link>
                  </TableCell>
                  <TableCell
                    onClick={() => window.location.reload()}
                    className="pre_y"
                    align="left"
                    width="420px"
                  >
                    <Link
                      to={`/${this.props.board_name}/view/id=${pre_post.postage_key}&board=${this.props.board_key}`}
                    >
                      {pre_post.postage_title}
                    </Link>
                    <font color="#006CB7"> [{pre_post.postage_comment}]</font>
                  </TableCell>
                  <TableCell className="pre_y" align="center" width="100px">
                    {pre_post.nickname}
                  </TableCell>
                  <TableCell className="pre_y" align="center">
                    <FavoriteIcon color="secondary" />
                    {pre_post.postage_love}
                  </TableCell>
                  <TableCell className="pre_y" align="center">
                    {pre_post.post_date}
                  </TableCell>
                  <TableCell className="pre_y" align="center">
                    <VisibilityIcon />
                    {pre_post.postage_views}
                  </TableCell>
                </TableRow>
              )}

              {next_post === undefined && (
                <TableRow className="next_row_n">
                  <TableCell className="next_n" width="150px" height="29.6px">
                    다음글이 없습니다
                  </TableCell>
                </TableRow>
              )}
              {next_post !== undefined && (
                <TableRow>
                  <TableCell
                    onClick={() => window.location.reload()}
                    className="next_y"
                    width="80px"
                  >
                    <Link
                      to={`/${this.props.board_name}/view/id=${next_post.postage_key}&board=${this.props.board_key}`}
                    >
                      다음 글<ArrowDropDownIcon />
                    </Link>
                  </TableCell>
                  <TableCell
                    onClick={() => window.location.reload()}
                    align="left"
                    className="next_y"
                    width="420px"
                  >
                    <Link
                      to={`/${this.props.board_name}/view/id=${next_post.postage_key}&board=${this.props.board_key}`}
                    >
                      {next_post.postage_title}
                    </Link>
                    <font color="#006CB7"> [{next_post.postage_comment}]</font>
                  </TableCell>
                  <TableCell align="center" className="next_y" width="100px">
                    {next_post.nickname}
                  </TableCell>
                  <TableCell align="center" className="next_y1">
                    <FavoriteIcon color="secondary" />
                    {next_post.postage_love}
                  </TableCell>
                  <TableCell align="center" className="next_y">
                    {next_post.post_date}
                  </TableCell>
                  <TableCell align="center" className="next_y2">
                    <VisibilityIcon />
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
