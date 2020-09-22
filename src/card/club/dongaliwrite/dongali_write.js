import React from "react";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/AddAPhoto";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import "./dongali_write.css";
import Mac from "./mac1.jpg";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import Button from "@material-ui/core/Button";

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
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentWillMount() {
    this.setState({
      nickname: JSON.parse(localStorage.getItem("user")).nickname,
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

      if (this.state.postNum === 0) {
        const post = {
          clubTitle: this.state.clubTitle,
          clubSubtitle: this.state.clubSubtitle,
          clubShowbody: this.state.clubShowbody,
          clubBody: this.state.clubBody,
          nickname: this.state.nickname,
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
          .then((document.location.href = "/club"));
      } else {
        const post = {
          clubTitle: this.state.clubTitle,
          clubSubtitle: this.state.clubSubtitle,
          clubShowbody: this.state.clubShowbody,
          clubBody: this.state.clubBody,
          postNum: this.state.postNum,
        };
        fetch("api/clubupdate", {
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
          .then((document.location.href = "/club"));
      }
    }
  }

  goBack() {
    if (this.state.postNum === 0) {
      document.location.href = "/club";
    } else {
      document.location.href = "/3?" + this.state.postNum;
    }
  }

  render() {
    return (
      <Paper id="paper">
        <div className="background">
          <form onSubmit={this.onSubmit}>
            <div className="picture">
              {" "}
              {/*동아리홍보 사진받는 부분*/}
              <input accept="image/*" id="icon-button-file" type="file" />
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
              <img src={Mac} alt="" /> {/*사진*/}
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
              id="cancel"
              variant="contained"
              color="secondary"
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
