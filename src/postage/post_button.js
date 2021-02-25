import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Typography } from "@material-ui/core";
import "./post_button.css";

function PostButtonCheck(props) {
  if (props.own_post_state === true) {
    return (
      <div className= "modify_delete_buttonbox">
        <Button variant="contained" type="submit" id="post_modify" >
          <Link
            to={{
              pathname: `/${props.board_name}/view/id=${props.postage_key}&board=${props.board_key}/postage_modify`,
            }}
          >
            수정
          </Link>
        </Button>

        <Button
          variant="contained"
          color="secondary"
          id="post_delete"
          onClick={props.handleClickOpen}
        >
          삭제
        </Button>
        <Dialog onClose={props.handleClose} open={props.open}>
          <DialogTitle onClose={props.handleClose}>삭제 경고</DialogTitle>

          <DialogContent>
            <Typography gutterBottom>해당 게시물이 삭제됩니다.</Typography>
          </DialogContent>

          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={props.onClick_delete_postage}
            >
              삭제
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={props.handleClose}
            >
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else {
    return <div></div>;
  }
}

class Post_button extends Component {
  editorRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      board_name: "",
    };
    this.onClick_delete_postage = this.onClick_delete_postage.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onClick_goback_list = this.onClick_goback_list.bind(this);
  }
  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }
  onClick_goback_list() {
    document.location.href = `/${this.state.board_name}/list/board=${this.props.board_key}`;
  }
  onClick_delete_postage() {
    const post = {
      postage_key: this.props.postage_key,
    };
    fetch("http://localhost:3001/api/post_delete", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    }).then(
      (document.location.href = `/${this.state.board_name}/list/board=${this.props.board_key}`)
    );
  }
  componentWillMount() {
    switch (this.props.board_key) {
      case "0":
        this.setState({ board_name: "free" });
        break;
      case "1":
        this.setState({ board_name: "anonymous" });
        break;
      case "2":
        this.setState({ board_name: "new" });
        break;
      case "3":
        this.setState({ board_name: "love" });
        break;
      case "4":
        this.setState({ board_name: "politic" });
        break;
      case "5":
        this.setState({ board_name: "night" });
        break;
      case "6":
        this.setState({ board_name: "changwon" });
        break;
      case '7':
          this.setState({board_name: "study"});
          break;
      case '8':
          this.setState({board_name: "old"});
          break;   
      case '9':
          this.setState({board_name: "EmploymentReview"});
          break;       
      case '10':
          this.setState({board_name: "EmploymentAnnouncement"});
          break;     
      default:
          break;
    }
  }
  render() {
    return (
      <div className = "post_button">
        <span>
        <Button
          variant="contained"
          color="primary"
          id="all_post"
          onClick={this.onClick_goback_list}
        >
          전체글
        </Button>
        </span>
        <span className="post_delete_modify_button">
          <PostButtonCheck
            own_post_state={this.props.own_post_state}
            board_name={this.state.board_name}
            postage_key={this.props.postage_key}
            board_key={this.props.board_key}
            handleClickOpen={this.handleClickOpen}
            handleClose={this.handleClose}
            open={this.state.open}
            onClick_delete_postage={this.onClick_delete_postage}
          />
        </span>
      </div>
    );
  }
}

export default Post_button;
