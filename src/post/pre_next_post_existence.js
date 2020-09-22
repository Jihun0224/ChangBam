import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import React from "react";
import { Link } from "react-router-dom";
import TableCell from "@material-ui/core/TableCell";
import FavoriteIcon from "@material-ui/icons/Favorite";
import VisibilityIcon from "@material-ui/icons/Visibility";

function Exist_post(props) {
  console.log(props.pre_post.postage_title);
  return (
    <div>
      <TableCell className="pre_or_next">
        <Link
          to={`/${props.board_name}/view/id=${props.pre_post.postage_key}&board=${props.board_key}`}
        >
          이전 글
        </Link>
        <ArrowDropUpIcon />
      </TableCell>
      <TableCell align="left" width="420px">
        <Link
          to={`/${props.board_name}/view/id=${props.pre_post.postage_key}&board=${props.board_key}`}
        >
          {props.pre_post.postage_title}
        </Link>{" "}
        <font color="#999"> [{props.pre_post.postage_comment}]</font>
      </TableCell>
      <TableCell align="center" width="100px">
        {props.pre_post.nickname}
      </TableCell>
      <TableCell align="center">
        <FavoriteIcon color="secondary" />
        {props.pre_post.postage_love}
      </TableCell>
      <TableCell align="center">{props.pre_post.post_date}</TableCell>
      <TableCell align="center">
        <VisibilityIcon />
        {props.pre_post.see}
      </TableCell>
    </div>
  );
}

function Not_exist_post() {
  return (
    <div>
      <TableCell className="pre_or_next">
        이전글
        <ArrowDropUpIcon />
      </TableCell>
      <TableCell align="left" width="420px">
        이전글이 없습니다.
      </TableCell>
    </div>
  );
}
function Post_exist_check(props) {
  if (props.pre_post.postage_title === "이전글이 없습니다.") {
    return (
      <Not_exist_post
        pre_post={props.pre_post}
        board_name={props.board_name}
        board_key={props.board_key}
      />
    );
  } else {
    return <Exist_post />;
  }
}
class Pre_and_next_post_Existence extends React.Component {
  render() {
    return (
      <div>
        <Post_exist_check
          pre_post={this.props.pre_post}
          board_name={this.props.board_name}
          board_key={this.props.board_key}
        />
      </div>
    );
  }
}

export default Pre_and_next_post_Existence;
