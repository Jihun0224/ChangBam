import React, { Component } from "react";
import TopAppbar from "../appbar/appbar";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import Button from "@material-ui/core/Button";
import { ToastContainer, toast } from "react-toastify";
import Error from "@material-ui/icons/Error";
import Check from "@material-ui/icons/Check";
import "react-toastify/dist/ReactToastify.css";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import BottomMenu from '../bottommenu/bottommenu';
import { Typography } from "@material-ui/core";
import swal from 'sweetalert';

function dataUrlToBlob(dataURL) {
  const BASE64_MARKER = ";base64,";
  if (dataURL.indexOf(BASE64_MARKER) === -1) {
    const parts = dataURL.split(",");
    const contentType = parts[0].split(":")[1];
    const raw = parts[1];

    return new Blob([raw], { type: contentType });
  } else {
    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    let i = 0;
    while (i < rawLength) {
      uInt8Array[i] = raw.charCodeAt(i);
      i++;
    }
    return new Blob([uInt8Array], { type: contentType });
  }
}

function resize_image(image) {
  let canvas = document.createElement("canvas"),
    max_size = 1280,
    width = image.width,
    height = image.height;

  if (width > height) {
    if (width > max_size) {
      height *= max_size / width;
      width = max_size;
    }
  } else {
    if (height > max_size) {
      width *= max_size / height;
      height = max_size;
    }
  }
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d").drawImage(image, 0, 0, width, height);
  const dataUrl = canvas.toDataURL("image/jpeg");
  return dataUrl;
}
class Home2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board_key: "", //게시글을 쓸 게시판 번호
      nickname: "", //글쓴 유저 닉네임
      title: "", //제목
      contents: "", //본문
      board_name: "", //게시판 이름
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  goBack() {
    this.props.history.goBack();
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleChange(content) {
    this.setState({ contents: content });
  }
  onSubmit(e) {
    e.preventDefault();
    const post = {
      title: this.state.title,
      contents: this.state.contents,
      nickname: JSON.parse(localStorage.getItem("user")).nickname,
      board_key: this.state.board_key,
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
      fetch("http://localhost:3001/api/postage_write", {
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
                <p>게시글이 등록되었습니다.</p>
              </div>
            </div>
          )
        )
        .then(window.history.back());
    }
  }

  handleImageUploadBefore(files, info, uploadHandler) {
    //""https://s3.ap-northeast-2.amazonaws.com/cu-night/"1598858809816.jpg"
    console.log(files[0]);
    let reader = new FileReader();
    reader.onloadend = () => {
      const image = new Image();
      image.className = "img-item";
      image.src = reader.result;
      image.onload = (imageEvent) => {
        const dataUrl = resize_image(image);
        const file = dataUrlToBlob(dataUrl);
        console.log(file);
        const formData = new FormData();
        formData.append("image", file);
        fetch("api/api/ImageUpload", {
          method: "post",
          body: formData,
        })
          .then((res) => res.json())
          .then((json) => {
            let linkid =
              "https://s3.ap-northeast-2.amazonaws.com/cu-night/" + json;
            uploadHandler({
              // "errorMessage": "insert error message",
              result: [{ url: linkid, name: json, size: "999" }],
            });
          });
      };
    };
    reader.readAsDataURL(files[0]);
  }

  componentWillMount() {
    if(JSON.parse(localStorage.getItem("user")) == null){
      swal({
        title: "로그인해 주세요!",
        icon: "warning",
      })
      this.props.history.goBack();
      
    }
    else{
    const { params } = this.props.match;

    switch (params.board_name) {
      case "free":
        this.setState({ board_key: 0, board_name: "자유게시판" });
        break;
      case "anonymous":
        this.setState({ board_key: 1, board_name: "익명게시판" });
        break;
      case "new":
        this.setState({ board_key: 2, board_name: "새내기게시판" });
        break;
      case "love":
        this.setState({ board_key: 3, board_name: "연애게시판" });
        break;
      case "politic":
        this.setState({ board_key: 4, board_name: "정치게시판" });
        break;
      case "changbam":
        this.setState({ board_key: 5, board_name: "창밤 공지사항" });
        break;
      case "changwon":
        this.setState({ board_key: 6, board_name: "학교 공지사항" });
        break;
      case "study":
          this.setState({board_key:7, board_name:"스터디그룹"});
          break;
      case "old":
        this.setState({board_key:8, board_name:"졸업생게시판"})
        break;
      case "EmploymentReview":
        this.setState({board_key:9, board_name:"취업게시판"})
        break;
      case "EmploymentAnnouncement":
          this.setState({board_key:10, board_name:"채용공고"})
        break;
      default:
        break;
      }
  }
}
  render() {
    const { onChange, onSubmit, goBack, handleChange } = this;
    
    if(JSON.parse(localStorage.getItem("user")) == null){
      return(
        <>
        </>
      )
  }
    else{
      return (
      <div className="postage_write_page">
        <TopAppbar />
          <div className="board_title">
            <Typography variant="h3"> {this.state.board_name}</Typography>
        </div>
        <div className="write_wrap">
          <div className="form" noValidate autoComplete="off">
            <form onSubmit={onSubmit}>
              <div className="titleinput">
                <input
                  id="title_area"
                  size="small"
                  placeholder="제목을 입력해 주세요."
                  type="text"
                  name="title"
                  maxLength="40"
                  value={this.state.title}
                  onChange={onChange}
                />
                <p />※ 음란물, 차별, 비하, 혐오 및 초상권, 저작권 침해 게시물은
                민, 형사상의 책임을 질 수 있습니다.
              </div>
              <div className="tui_edidtor">
                <SunEditor
                  toolbarContainer="#toolbar_container"
                  showPathLabel="false"
                  charCounter="true"
                  maxCharCount="720px"
                  width="1020px"
                  height="370px"
                  lang="ko"
                  placeholder="내용을 입력하세요."
                  onChange={handleChange}
                  setOptions={{
                    buttonList: [
                      ["undo", "redo", "font", "fontSize", "formatBlock"],
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
                      [
                        "link",
                        "image",
                        "video",
                        "fullScreen",
                        "showBlocks",
                        "codeView",
                        "preview",
                      ],
                    ],
                  }}
                />
              </div>
              <div className="button_box">
                <Button
                  className="commit"
                  variant="contained"
                  color="primary"
                  type="submit"
                  id="submit"
                >
                  등록
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
              </div>
            </form>
            <ToastContainer />
          </div>
        
        </div>
        <div className="postage_write_bottommenu">
          <BottomMenu/>
          </div>
      </div>
    );
  }
}
}
export default Home2;
