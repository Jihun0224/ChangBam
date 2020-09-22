//비밀번호 입력하고
//회원탈퇴
//취소 버튼

import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./profile.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "@material-ui/icons/Error";
import Check from "@material-ui/icons/Check";

class Withdrawal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      pwd: "", //현재비밀번호
      pwdiv: "8자리 이상 특수문자 영문자 숫자로 구성",
      pwcheck: "",
      check: false,
      pwinput: true,
      checkingcurpwd: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  onSubmit(e) {
    e.preventDefault();
    const post = {
      id: this.state.id,
    };
    if (this.state.checkingcurpwd === false) {
      toast.error(
        <div>
          <Error />
          <div className="toast">
            <p>비밀번호를 확인하세요</p>
          </div>
        </div>
      );
    } else {
      //post전송
      fetch("api/rm", {
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
                <p>정상적으로 탈퇴되었습니다.</p>
              </div>
            </div>
          )
        )
        .then(localStorage.clear());
    }
  }

  render() {
    const { pwd } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <div className="Withdrawal_form" noValidate autoComplete="off">
        <form onSubmit={onSubmit}>
          <div className="pw2input">
            <p>
              비밀번호 입력
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
                variant="outlined"
                color="primary"
                onClick={this.checkcurrentpw}
              >
                확인
              </Button>
            </p>
          </div>
          <Button className="Withdrawal_button" type="submit">
            회원탈퇴
          </Button>
        </form>
        <ToastContainer />
      </div>
    );
  }
}
export default Withdrawal;
