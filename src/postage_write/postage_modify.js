import React, { Component } from "react";
import TopAppbar from "../appbar/appbar";
import Button from "@material-ui/core/Button";
import { ToastContainer, toast } from "react-toastify";
import Error from "@material-ui/icons/Error";
import Check from "@material-ui/icons/Check";
import "react-toastify/dist/ReactToastify.css";
import "./postage_write.css";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import BottomMenu from '../bottommenu/bottommenu';
import { Typography } from "@material-ui/core";
class Postage_modify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board_key: "", //게시글을 쓸 게시판 번호
      title: "", //제목
      contents: "", //본문
      board_name: "", //게시판 이름
      postage_key: this.props.match.params.postage_key,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleVideoUpload = this.handleVideoUpload.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleVideoUpload(targetElement, index, state, info, remainingFilesCount) {
    console.log(targetElement, index, state, info, remainingFilesCount);
  }
  handleChange(content) {
    this.setState({ contents: content });
  }
  onSubmit(e) {
    e.preventDefault();

    const post = {
      title: this.state.title,
      contents: this.state.contents,
      postage_key: this.state.postage_key,
    };

    if (this.state.title === "") {
      toast.error(
        <div>
          <Error />
          <div className="toast">
            <p>제목을 입력하세요</p>
          </div>
        </div>
      );
    } else if (this.state.contents === "") {
      toast.error(
        <div>
          <Error />
          <div className="toast">
            <p>본문을 입력하세요</p>
          </div>
        </div>
      );
    } else {
      //post전송

      fetch("http://localhost:3001/api/postage_modify", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(post),
      })
        .then(
          toast.success(
            <div>
              <Check />
              <div className="toast">
                <p>게시글이 수정되었습니다.</p>
              </div>
            </div>
          )
        )
        .then(window.history.back());
    }
  }

  componentWillMount() {
    const post = {
      postage_key: this.props.match.params.postage_key,
    };

    fetch("http://localhost:3001/api/postage_modify_row", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          title: res[0].postage_title,
          contents: res[0].postage_body,
        });
      });

    const { params } = this.props.match;

    switch (params.board_name) {
      case "free":
        this.setState({ board_key: 0, board_name: "자유 게시판" });
        break;
      case "anonymous":
        this.setState({ board_key: 1, board_name: "익명 게시판" });
        break;
      case "new":
        this.setState({ board_key: 2, board_name: "새내기 게시판" });
        break;
      case "love":
        this.setState({ board_key: 3, board_name: "연애 상담소" });
        break;
      case "politic":
        this.setState({ board_key: 4, board_name: "정치 게시판" });
        break;
      case "changbam":
        this.setState({ board_key: 5, board_name: "창밤 공지사항" });
        break;
      case "changwon":
        this.setState({ board_key: 6, board_name: "학교 공지사항" });
        break;
      case "study":
        this.setState({board_key:7, board_name:"스터디 그룹"});
        break;
      case "old":
        this.setState({board_key:8, board_name:"꼰대 게시판"})
        break;
      case "EmploymentReview":
        this.setState({board_key:9, board_name:"취업 후기"})
        break;
      case "EmploymentAnnouncement":
          this.setState({board_key:10, board_name:"취업 공고"})
        break; 
      default:
        break;
    }
  }

  render() {
    const {
      onChange,
      onSubmit,
      goBack,
      handleChange,
      handleVideoUpload,
    } = this;
    return (
      <div className="postage_write_page">
        <TopAppbar />
          <div className="board_title">
            <Typography variant="h3"> {this.state.board_name}</Typography>
        </div>
        <div className="write_wrap">
          <div className="form" noValidate autoComplete="off">
            <form onSubmit={onSubmit} className="form_div">
              <div className="titleinput">
                <input
                  id="title_area"
                  size="small"
                  type="text"
                  name="title"
                  maxLength="40"
                  value={this.state.title}
                  onChange={onChange}
                />
                <p />※ 음란물, 차별, 비하, 혐오 및 초상권, 저작권 침해 게시물은
                민, 형사상의 책임을 질 수 있습니다.
              </div>

              <SunEditor
                className="suneditor"
                toolbarContainer="#toolbar_container"
                showPathLabel="false"
                charCounter="true"
                maxCharCount="720px"
                width="1020px"
                height="400px"
                lang="ko"
                ref={this.editorRef}
                setContents={this.state.contents}
                onChange={handleChange}
                onVideoUpload={handleVideoUpload}
                setOptions={{
                  buttonList: [
                    [
                      "undo",
                      "redo",
                      "font",
                      "fontSize",
                      "formatBlock",
                      "fontColor",
                      "hiliteColor",
                    ],
                    [
                      "bold",
                      "underline",
                      "italic",
                      "strike",
                      "subscript",
                      "superscript",
                      "removeFormat",
                    ],

                    [
                      "fontColor",
                      "hiliteColor",
                      "outdent",
                      "indent",
                      "align",
                      "horizontalRule",
                      "list",
                      "table",
                    ],
                    ["link", "image", "fullScreen", "showBlocks", "preview"],
                  ],
                }}
              />
              <Button
                className="commit"
                variant="contained"
                color="primary"
                type="submit"
                id="submit"
              >
                수정
              </Button>
              <Button
                className="cancel"
                variant="contained"
                color="secondary"
                id="cancel"
                margin-left="20px"
                onClick={goBack}
              >
                취소
              </Button>
            </form>
            <ToastContainer />
            <div className="sunedidtor"></div>
          </div>
        </div>
        <div className="postage_write_bottommenu">
          <BottomMenu/>
          </div>
      </div>
    );
  }
}

export default Postage_modify;
