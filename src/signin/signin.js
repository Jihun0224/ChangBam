/* eslint-disable */ //eslint경고 삭제
import React from "react";
import "./login_signin.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "@material-ui/icons/Error";
import Check from "@material-ui/icons/Check";
import Checkbox from "@material-ui/core/Checkbox";

class Longin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "", //아이디
      nickname: "",
      pw: "", //비밀번호
      pw2: "", //비밀번호확인
      email: "", //이메일
      emailsearch: 0, //인증번호
      number: "", //이메일 인증번호 입력
      idcheck: "", //아이디 체크
      pwdiv: "8자리 이상 특수문자 영문자 숫자로 구성",
      pwcheck: "",
      nicknamecheck: "",
      check: false,
      pwinput: true,
      checking1: false,
      checking2: false,
      checking3: false,
      checking4: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkid = this.checkid.bind(this);
    this.checknickname = this.checknickname.bind(this);
    this.checkpw = this.checkpw.bind(this);
    this.checkemail = this.checkemail.bind(this);
    this.checkemail2 = this.checkemail2.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const post = {
      id: this.state.idcheck,
      pw: this.state.pwcheck,
      nickname: this.state.nicknamecheck,
      email: this.state.email,
    };
    if (this.state.idcheck === "") {
      toast.error(
        <div>
          <Error />
          <div className="toast">
            <p>아이디 중복체크를 하세요</p>
          </div>
        </div>
      );
    } else if (this.state.pwcheck === "") {
      toast.error(
        <div>
          <Error />
          <div className="toast">
            <p>비밀번호 확인 하세요.</p>
          </div>
        </div>
      );
    } else if (this.state.check === false) {
      toast.error(
        <div>
          <Error />
          <div className="toast">
            <p>이메일 인증을 받으세요</p>
          </div>
        </div>
      );
    } else {
      //post전송
      fetch("api/log", {
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
                <p>회원가입을 축하드립니다.</p>
              </div>
            </div>
          )
        )
        .then(window.setTimeout(this.props.handlesub(), 2000));
    }
  }

  checkid(e) {
    //아이디 중복검사
    var special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    e.preventDefault();
    if (
      special_pattern.test(this.state.id) === true ||
      this.state.id.search(/\s/) != -1 ||
      this.state.id.length < 5 ||
      this.state.id.length > 20
    ) {
      toast.error(
        <div>
          <Error />
          <div className="toast">
            <p>5~20자의 영문숫자만 사용 가능합니다.</p>
          </div>
        </div>
      );
    } else {
      const post = {
        id: this.state.id,
      };
      if (this.state.id === "") {
        toast.error(
          <div>
            <Error />
            <div className="toast">
              <p>아이디를 입력하세요.</p>
            </div>
          </div>
        );
        this.setState({
          checking1: false,
        });
      } else {
        fetch("api/user", {
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
                    <p>사용할수있는 아이디입니다.</p>
                  </div>
                </div>
              );
              this.setState({
                checking1: true,
                idcheck: this.state.id,
              });
            } else {
              toast.error(
                <div>
                  <Error />
                  <div className="toast">
                    <p>이미있는 아이디입니다.</p>
                  </div>
                </div>
              );
              this.setState({
                checking1: false,
              });
            }
          });
      }
    }
  }
  checknickname(e) {
    //아이디 중복검사
    e.preventDefault();

    const post = {
      nickname: this.state.nickname,
    };

    fetch("api/user", {
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
            nicknamecheck: this.state.nickname,
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
        checking3: false,
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
          checking3: false,
        });
      } else if (this.state.pw == this.state.pw2) {
        toast.success(
          <div>
            <Check />
            <div className="toast">
              <p>비밀번호가 일치합니다.</p>
            </div>
          </div>
        );
        this.setState({
          pwdiv: "비밀번호가 일치합니다",
          pwinput: false,
          pwcheck: this.state.pw,
          checking3: true,
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
          checking3: false,
        });
      }
    }
  }
  checkemail(e) {
    var special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

    e.preventDefault();
    if (
      special_pattern.test(this.state.email) === true ||
      this.state.email.search(/\s/) != -1
    ) {
      toast.error(
        <div>
          <Error />
          <div className="toast">
            <p>형식이 올바르지 않습니다.</p>
          </div>
        </div>
      );
    } else {
      const email = {
        email: this.state.email,
      };
      toast(
        `${this.state.email}@changwon.ac.kr으로 인증번호 확인하세요! (1~2분소요가능)`
      );
      fetch("api/email", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(email),
      })
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            emailsearch: json.emailsearch,
          });
        });
    }
  }
  checkemail2(e) {
    e.preventDefault();
    if (this.state.number * 1 == this.state.emailsearch) {
      toast.success(
        <div>
          <Check />
          <div className="toast">
            <p>인증완료</p>
          </div>
        </div>
      );
      this.setState({
        check: true,
        checking4: true,
      });
    } else {
      toast.error(
        <div>
          <Error />
          <div className="toast">
            <p>이메일인증번호를 다시확인하세요.</p>
          </div>
        </div>
      );
      this.setState({
        checking4: false,
      });
    }
  }

  render() {
    const { id, nickname, pw, pw2, email, number } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <div className="login_form" noValidate autoComplete="off">
        <form onSubmit={onSubmit}>
          <div className="idinput">
            <p>
              아이디
              <Checkbox
                checked={this.state.checking1}
                inputProps={{ "aria-label": "primary checkbox" }}
                color="primary"
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                label="ID"
                type="text"
                name="id"
                value={id}
                onChange={onChange}
              />
              <Button variant="outlined" color="primary" onClick={this.checkid}>
                중복체크
              </Button>
            </p>
          </div>
          <div className="nickinput">
            <p>
              닉네임
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
            </p>
          </div>
          <div className="pwinput">
            <p>
              비밀번호 입력
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
            </p>
          </div>
          <div className="pw2input">
            <p>
              비밀번호 확인
              <Checkbox
                checked={this.state.checking3}
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
            </p>
          </div>
          <div className="emailinput">
            <p>
              이메일 인증
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                label="email"
                type="text"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="e-mail"
              />
              <span className="changwonackr">@changwon.ac.kr</span>
              <Button
                variant="outlined"
                color="primary"
                onClick={this.checkemail}
              >
                인증보내기
              </Button>
            </p>
            <div className="emailsearch">
              <Checkbox
                checked={this.state.checking4}
                inputProps={{ "aria-label": "primary checkbox" }}
                color="primary"
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                label="인증번호"
                type="text"
                name="number"
                value={number}
                onChange={onChange}
                placeholder="6자리입력"
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={this.checkemail2}
              >
                인증확인
              </Button>
            </div>
          </div>
          <Button variant="contained" color="primary" type="submit" id="submit">
            회원가입
          </Button>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default Longin;
