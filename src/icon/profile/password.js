import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./profile.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "@material-ui/icons/Error";
import Check from "@material-ui/icons/Check";
import Checkbox from "@material-ui/core/Checkbox";

class Password_change extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      pwd: "", //현재비밀번호
      pw: "", //비밀번호
      pw2: "", //비밀번호확인
      pwdiv: "8자리 이상 특수문자 영문자 숫자로 구성",
      pwcheck: "",
      check: false,
      pwinput: true,
      checking: false, // 변경될 비밀번호 일치
      checkingcurpwd: false, //현재의 비밀번호가 일치하는지
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkpw = this.checkpw.bind(this);
    this.checkcurrentpw = this.checkcurrentpw.bind(this);
  }

  componentWillMount() {
    console.log(JSON.parse(localStorage.getItem("user")));
    this.setState({
      id: JSON.parse(localStorage.getItem("user")).id,
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  checkcurrentpw(e) {
    e.preventDefault();
    const post = {
      id: this.state.id,
    };
    fetch("api/getpwd", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json[0].user_pw === this.state.pwd) {
          toast.success(
            <div>
              <Check />
              <div className="toast">
                <p>비밀번호가 일치합니다.</p>
              </div>
            </div>
          );
          this.setState({
            checkingcurpwd: true,
          });
        } else {
          toast.error(
            <div>
              <Error />
              <div className="toast">
                <p>비밀번호가 일치하지않습니다.</p>
              </div>
            </div>
          );
          this.setState({
            checkingcurpwd: false,
          });
        }
      });
    console.log(this.state.checkingcurpwd);
  }

  checkpw(e) {
    e.preventDefault();
    var pattern1 = /[0-9]/; //숫자
    var pattern2 = /[a-zA-Z]/; //영어
    var pattern3 = /[~!@#$%^&*()_+|<>?:{}]/; //특수문자

    if (
      !pattern1.test(this.state.pw) ||
      !pattern2.test(this.state.pw) ||
      !pattern3.test(this.state.pw) ||
      this.state.pw.length < 8
    ) {
      toast(
        "비밀번호 형식은 8자리 이상 특수문자 영문자 숫자로 구성되어야합니다!"
      );
      this.setState({
        checking: false,
      });
    } else {
      if (this.state.pw === "") {
        toast.error(
          <div>
            <Error />
            <div className="toast">
              <p>비밀번호를 입력하세요.</p>
            </div>
          </div>
        );
        this.setState({
          checking: false,
        });
      } else if (this.state.pw === this.state.pw2) {
        toast.success(
          <div>
            <Check />
            <div className="toast">
              <p>비밀번호가 일치합니다.</p>
            </div>
          </div>
        );
        this.setState({
          pwinput: false,
          pwcheck: this.state.pw,
          checking: true,
        });
      } else {
        toast.error(
          <div>
            <Error />
            <div className="toast">
              <p>비밀번호가 일치하지않습니다.</p>
            </div>
          </div>
        );
        this.setState({
          pwdiv: "비밀번호가 일치하지않습니다.",
          checking: false,
        });
      }
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const post = {
      id: this.state.id,
      pw: this.state.pwcheck,
    };
    if (this.state.checking === false) {
      toast.error(
        <div>
          <Error />
          <div className="toast">
            <p>비밀번호 확인 하세요.</p>
          </div>
        </div>
      );
    } else {
      //post전송
      fetch("hapi/rename_pw", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(post),
      }).then(
        toast.success(
          <div>
            <Check />
            <div className="toast">
              <p>비밀번호가 변경되었습니다.</p>
            </div>
          </div>
        )
      );
    }
  }

  render() {
    const { pwd, pw, pw2 } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <div className="password_change_form">
        <form onSubmit={onSubmit}>
          <div className="pw2input">
            현재 비밀번호 입력
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              label="password"
              type="password"
              name="pwd"
              value={pwd}
              onChange={onChange}
            />
            <Button
              s
              variant="outlined"
              color="primary"
              onClick={this.checkcurrentpw}
            >
              확인
            </Button>
          </div>
          <div className="pwinput">
            <label>새 비밀번호 입력</label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              label="password"
              type="password"
              name="pw"
              value={pw}
              onChange={onChange}
            />
          </div>
          <div className="pw2input">
            <label>새 비밀번호 확인</label>
            <Checkbox
              checked={this.state.checking}
              inputProps={{ "aria-label": "primary checkbox" }}
              color="primary"
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              label="password"
              type="password"
              name="pw2"
              value={pw2}
              onChange={onChange}
            />
            <Button variant="outlined" color="primary" onClick={this.checkpw}>
              확인
            </Button>
          </div>
          <Button
            id="password_store"
            variant="outlined"
            color="primary"
            type="submit"
          >
            확인
          </Button>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default Password_change;
