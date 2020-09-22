import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./profile.css";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Error from "@material-ui/icons/Error";
import Check from "@material-ui/icons/Check";
import Checkbox from "@material-ui/core/Checkbox";

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

class Profile_change extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      file: null,
      nickname: "",
      nicknamecheck: "",
      email: "",
      check: false,
      checking2: false,
      open: false,
      previewURL: "",
    };
    this.onChange = this.onChange.bind(this);
    this.checknickname = this.checknickname.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.file);
    const formData = new FormData();
    formData.append("imageFile", this.state.file);
    formData.append("nicknamecheck", this.state.nicknamecheck);
    formData.append("id", this.state.id);
    formData.append("img", this.props.profile);
    fetch("api/profile", {
      method: "post",
      body: formData,
    }).then(
      toast.success(
        <div>
          <Check />
          <div className="toast">
            <p>프로필이 수정되었습니다.</p>
          </div>
        </div>
      )
    );

    const user2 = JSON.parse(localStorage.getItem("user"));
    user2.nickname = this.state.nicknamecheck;
    window.localStorage.setItem("user", JSON.stringify(user2));
    window.location.reload();
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  componentWillMount() {
    console.log(JSON.parse(localStorage.getItem("user")));
    this.setState({
      id: JSON.parse(localStorage.getItem("user")).id,
      nickname: JSON.parse(localStorage.getItem("user")).nickname,
      email: JSON.parse(localStorage.getItem("user")).email + "@changwon.ac.kr",
    });
  }
  /* 일반적인 파일 저장 이벤트
    handleFileOnChange = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
          this.setState({
            file : file,
            previewURL : reader.result
          })
        }
        reader.readAsDataURL(event.target.files[0]);
    }*/

  handleFileOnChange = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    reader.onloadend = () => {
      const image = new Image();
      image.className = "img-item";
      image.src = reader.result;
      image.onload = (imageEvent) => {
        const dataUrl = resize_image(image);
        this.setState({
          previewURL: dataUrl,
          file: dataUrlToBlob(dataUrl),
        });
      };
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  checknickname(e) {
    //아이디 중복검사
    e.preventDefault();
    const post = {
      nickname: this.state.nickname,
    };
    fetch("/api/nickname", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json[0] === undefined) {
          toast.success(
            <div>
              <Check />
              <div className="toast">
                <p>사용할수있는 별명입니다.</p>
              </div>
            </div>
          );
          this.setState({
            nicknamecheck: `${this.state.nickname}`,
            checking2: true,
          });
        } else {
          toast.error(
            <div>
              <Error />
              <div className="toast">
                <p>이미있는 별명입니다.</p>
              </div>
            </div>
          );
          this.setState({
            checking2: false,
          });
        }
      });
  }

  render() {
    const { id, nickname, email } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <div className="profile_card_change">
        <form onSubmit={onSubmit} noValidate autoComplete="off">
          <Card className="profile_card">
            <CardMedia
              className="profile_image"
              image={this.state.previewURL}
            />
            <CardContent>
              <div className="nickname_and_statemessage">
                <Typography variant="h5">{id}</Typography>
                <Typography gutterBottom variant="subtitle1">
                  {nickname}
                </Typography>
              </div>
              <div className="profile_info2">
                <hr />
                <br />
                <Button className="profile_body">{email}</Button>
                <Button className="profile_body" component="label">
                  프로필 이미지 수정
                  <input
                    id={"file-input"}
                    style={{ display: "none" }}
                    type="file"
                    name="imageFile"
                    accept="image/jpg,impge/png,image/jpeg,image/gif"
                    onChange={this.handleFileOnChange}
                  />
                </Button>
              </div>
              <div className="nickinput">
                <Checkbox
                  checked={this.state.checking2}
                  inputProps={{ "aria-label": "primary checkbox" }}
                  color="primary"
                />
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  label="nickname"
                  type="text"
                  name="nickname"
                  value={nickname}
                  onChange={onChange}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.checknickname}
                >
                  중복체크
                </Button>
              </div>
              <Button
                className="store"
                variant="contained"
                color="primary"
                type="submit"
              >
                저장
              </Button>
            </CardContent>
          </Card>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default Profile_change;
