import React from "react";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/AddAPhoto";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import "./writing.css";
import Mac from "./mac.jpg";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import Button from "@material-ui/core/Button";

class Writing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      price: 0,
      location: "",
      content: "",
      nickname: "",
      postNum: 0,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
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
      console.log("게시글 번호", post.postNum);

      fetch("http://localhost:3001/api/getmarketpost", {
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
            productName: json[0].card_title,
            price: Number(json[0].card_price),
            location: json[0].card_location,
            content: json[0].card_body,
          });
        });
    }
  }
  onChange(e) {
    console.log("onchange");
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.productName);
    console.log(this.state.price);
    console.log(this.state.location);
    console.log(this.state.content);
    if (
      (this.state.productName =
        "" ||
        this.state.price === "" ||
        this.state.location === "" ||
        this.state.content === "")
    )
      alert("내용을 입력하세요");
    else {
      console.log("마켓 content");

      if (this.state.postNum === 0) {
        console.log(this.state.productName);
        const post = {
          productName: this.state.productName,
          price: this.state.price,
          location: this.state.location,
          content: this.state.content,
          nickname: this.state.nickname,
        };
        fetch("http://localhost:3001/api/market", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(post),
        })
          .then((res) => res.json())
          .then((json) => {
            this.setState({
              productName: "",
              price: 0,
              location: "",
              content: "",
              nickname: "",
              postNum: 0,
            });
          })
          .then((document.location.href = "/market"));
      } else {
        const post = {
          productName: this.state.productName,
          price: this.state.price,
          location: this.state.location,
          content: this.state.content,
          postNum: this.state.postNum,
        };
        fetch("http://localhost:3001/api/marketupdate", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(post),
        })
          .then((res) => res.json())
          .then((json) => {
            this.setState({
              productName: "",
              price: 0,
              location: "",
              content: "",
              nickname: "",
              postNum: 0,
            });
          })
          .then((document.location.href = "/market"));
      }
    }
  }

  goBack = () => {
    if (this.state.postNum === 0) {
      document.location.href = "/market";
    } else {
      document.location.href = "/2?" + this.state.postNum;
    }
  };

  render() {
    return (
      <Paper id="paper">
        <div className="background">
          <form onSubmit={this.onSubmit}>
            <div className="picture">
              <input accept="image/*" id="icon-button-file" type="file" />
              <label htmlFor="icon-button-file">
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
                <KeyboardArrowLeftIcon />
              </IconButton>
              <img alt="" src={Mac} />
              <img alt="" src={Mac} />
              <IconButton id="Icon">
                <KeyboardArrowRightIcon />
              </IconButton>
            </div>
            <p id="productText">상품명 : </p>
            <div className="productName">
              <TextField
                id="productName"
                type="text"
                name="productName"
                value={this.state.productName}
                onChange={this.onChange}
              ></TextField>
            </div>
            <br />
            <p id="positionText">위치 ex)창원시 사림동 : </p>
            <div className="location">
              <TextField
                id="location"
                type="text"
                name="location"
                value={this.state.location}
                onChange={this.onChange}
              ></TextField>
            </div>
            <br />
            <p id="priceText">판매가격 ex)5000 :</p>
            <div className="price">
              <TextField
                id="price"
                type="text"
                name="price"
                value={this.state.price}
                onChange={this.onChange}
              ></TextField>
            </div>
            <br />
            <p id="contentText">게시글에 작성될 내용을 입력해주세요.</p>
            <div className="content">
              <TextField
                id="content"
                type="text"
                rowsMax={10}
                multiline
                label=""
                variant="outlined"
                name="content"
                value={this.state.content}
                onChange={this.onChange}
              ></TextField>
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
export default Writing;
