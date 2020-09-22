import React from "react";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/AddAPhoto";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import "./dongari_writing.css";
import Mac from "./mac1.jpg";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import Button from "@material-ui/core/Button";

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

class dongari_Writing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clubTitle: "",
      clubSubtitle: "",
      clubShowbody: "",
      clubBody: "",
      nickname: "",
      postNum: 0,
      key: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentWillMount() {
    this.setState({
      nickname: JSON.parse(localStorage.getItem("user")).nickname,
      key: JSON.parse(localStorage.getItem("user")).key,
    });

    if (
      isNaN(
        Number(
          window.location.href.slice(window.location.href.indexOf("?") + 1)
        )
      )
    ) {
      console.log("수정하는 링크가 아님");
    } else {
      const post = {
        postNum: Number(
          window.location.href.slice(window.location.href.indexOf("?") + 1)
        ),
      };
      this.setState({
        postNum: post.postNum,
      });
      fetch("api/getclubpost", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(post),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log("게시글 내용 : ", json[0]);
          this.setState({
            clubTitle: json[0].card_title,
            clubSubtitle: json[0].card_subtitle,
            clubShowbody: json[0].card_showbody,
            clubBody: json[0].card_body,
          });
        });
    }
  }

  onChange(e) {
    console.log("onchange");
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    if (
      this.state.clubTitle === "" ||
      this.state.clubSubtitle === "" ||
      this.state.clubShowbody === "" ||
      this.state.clubBody === ""
    )
      alert("내용을 입력하세요");
    else {
      console.log("cardcontent");

      console.log("post Num : ", this.state.postNum);

      //if(this.state.postNum===0){
      const post = {
        clubTitle: this.state.clubTitle,
        clubSubtitle: this.state.clubSubtitle,
        clubShowbody: this.state.clubShowbody,
        clubBody: this.state.clubBody,
        nickname: this.state.nickname,
        user_id: this.state.key,
      };
      fetch("api/club", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(post),
      })
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            clubTitle: "",
            clubSubtitle: "",
            clubShowbody: "",
            clubBody: "",
            nickname: "",
            postNum: 0,
          });
        })
        .then(
          (document.location.href = "/club")
        ); /*
            }else{
                const post ={
                    clubTitle:this.state.clubTitle,
                    clubSubtitle:this.state.clubSubtitle,
                    clubShowbody:this.state.clubShowbody,
                    clubBody:this.state.clubBody,
                    postNum:this.state.postNum
                }
                fetch('http://localhost:3001/api/clubupdate',{
                    method: "post",
                    headers : {
                        'content-type':'application/json'
                    },
                    body:JSON.stringify(post)
                })
                .then(res => res.json())
                .then(json =>{
                    this.setState({
                        clubTitle:'',
                        clubSubtitle:'',
                        clubShowbody:'',
                        clubBody:'',
                        nickname:'',
                        postNum:0
                    })
                }).then(document.location.href="/club")
            }*/
    }
  }

  goBack() {
    if (this.state.postNum === 0) {
      document.location.href = "/club";
    } else {
      document.location.href = "/3?" + this.state.postNum;
    }
  }
  handleFileOnChange = (e) => {
    const files = e.target.files;
    const filesArr = Array.prototype.slice.call(files);

    filesArr.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.className = "img-item"; // 스타일 적용을 위해
        image.src = e.target.result;
        image.onload = (imageEvent) => {
          // 이미지가 로드가 되면! 리사이즈 함수가 실행되도록 합니다.
          resize_image(image);
        };
      };

      reader.readAsDataURL(file);
    });
  };

  render() {
    return (
      <Paper id="paper">
        <div className="background">
          <form onSubmit={this.onSubmit}>
            <div className="picture">
              {" "}
              {/*동아리홍보 사진받는 부분*/}
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={this.handleFileOnChange}
                multiple
              />
              <label htmlFor="icon-button-file">
                {" "}
                {/*카메라 아이콘*/}
                <IconButton
                  id="Icon"
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
              <IconButton id="Icon">
                {" "}
                {/* 왼쪽 "<"" 아이콘*/}
                <KeyboardArrowLeftIcon />
              </IconButton>
              <img alt="" src={Mac} /> {/*사진*/}
              <IconButton id="Icon">
                {" "}
                {/* 오른쪽 ">"" 아이콘*/}
                <KeyboardArrowRightIcon />
              </IconButton>
            </div>
            <div className="clubTitle">
              <TextField
                id="clubTitle"
                label="동아리명"
                type="text"
                name="clubTitle"
                value={this.state.clubTitle}
                onChange={this.onChange}
              ></TextField>
            </div>
            <br />

            <div className="clubSubtitle">
              <TextField
                id="clubSubtitle"
                label="카테고리 ex: 음악동아리, 치어리딩동아리"
                type="text"
                name="clubSubtitle"
                value={this.state.clubSubtitle}
                onChange={this.onChange}
              ></TextField>
            </div>
            <br />

            <div className="clubShowbody">
              <TextField
                id="clubShowbody"
                rowsMax={7}
                type="text"
                multiline
                label="슬로건을 적어주세요.(짧은 홍보글. 게시판 메인에 보일 글입니다)"
                name="clubShowbody"
                value={this.state.clubShowbody}
                onChange={this.onChange}
              />
            </div>
            <br />
            <div className="clubBody">
              <TextField
                id="clubBody"
                rowsMax={10}
                type="text"
                multiline
                label="세부 홍보글"
                name="clubBody"
                value={this.state.clubBody}
                onChange={this.onChange}
              />
            </div>

            <Button
              className="cancel"
              variant="contained"
              color="secondary"
              id="cancel"
              margin-left="20px"
              onClick={this.goBack}
            >
              취소
            </Button>
            <br />
            <Button
              id="writing_button"
              type="submit"
              variant="contained"
              color="primary"
            >
              글쓰기
            </Button>
          </form>
        </div>
      </Paper>
    );
  }
}
export default dongari_Writing;
