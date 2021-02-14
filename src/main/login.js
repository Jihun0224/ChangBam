import React from "react";
import "./login.css";
import Signin from "../signin/signin";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import congratulation from "./party/congratulation.png";
import "react-toastify/dist/ReactToastify.css";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import TabList from "@material-ui/lab/TabList";
import TabContext from "@material-ui/lab/TabContext";
import CircularProgress from "@material-ui/core/CircularProgress";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "", //아이디
      pw: "", //비밀번호
      nickname: "",
      admin: false,
      open: false,
      signin: false,
      value: "0",
      idopen: false,
      emailfound: "",
      idfound: "찾지못하였습니다.",
      progress: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleopen = this.handleopen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handlesub = this.handlesub.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.id_findonSubmit = this.id_findonSubmit.bind(this);
    this.handleClose2 = this.handleClose2.bind(this);
    this.pw_findonSubmit = this.pw_findonSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const post = {
      id: this.state.id,
      pw: this.state.pw,
    };
    fetch("api/admin", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.boolean === false) {
          this.setState({
            admin: false,
          });
          alert("아이디비번다시확인!");
        } else if (json.boolean === true) {
          this.setState({
            admin: true,
            open: false,
          });
          const user = json;
          this.props.authsubmit(true);
          this.props.handleClose();

          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("admin", true);
          console.log(JSON.parse(localStorage.getItem("user")).id);
        }
      });
  }
  handleopen(e) {
    this.setState({
      open: true,
    });
  }
  handleClose(e) {
    this.setState({
      open: false,
      signin: false,
      value: "0",
    });
  }
  handleClose2() {
    this.setState({
      idopen: false,
    });
  }
  handlesub() {
    this.setState({
      open: false,
      signin: true,
    });
  }
  handleChange(event, newValue) {
    this.setState({
      value: newValue,
    });
  }
  handleCloseid() {
    this.setState({
      idopen: false,
    });
  }
  id_findonSubmit(e) {
    e.preventDefault();

    const post = {
      email: this.state.emailfound,
    };
    fetch("api/idfound", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json === false) {
          alert("일치하는 이메일이 없습니다.");
        } else {
          this.setState({
            idfound: `${json[0].user_id}`,
            idopen: true,
          });
          console.log(json[0].user_id);
        }
      });
  }
  pw_findonSubmit(e) {
    e.preventDefault();
    if (this.state.emailfound === "" || this.state.id === "") {
      alert("아이디 이메일 다시입력!");
    } else {
      this.setState({
        progress: <CircularProgress />,
      });
      const post = {
        email: this.state.emailfound,
        id: this.state.id,
      };
      fetch("api/pwfound", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(post),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json === false) {
            alert("아이디와 이메일이 일치하는 정보가 없습니다.");
            this.setState({
              id: "",
              emailfound: "",
              progress: "",
            });
          } else {
            this.setState({
              value: `0`,
              id: "",
              emailfound: "",
              progress: "",
            });
            console.log(json.success);
            alert(
              "비밀번호가 임시비밀번호로 변경이 되었습니다. 이메일에서 확인후에 꼭 비밀번호 변경을 해주세요"
            );
          }
        });
    }
  }
  render() {
    const { id, pw } = this.state;
    const { onChange, onSubmit, handleClose, handlesub, handleChange } = this;
    return (
      <div id="tabcontext">
        <TabContext value={this.state.value}>
          <div className="logbox">
            <TabList
              value={this.state.value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="action tabs example"
            >
              <Tab label="로그인" value="0" />
              <Tab label="회원가입" value="1" />
              <Tab label="아이디 찾기" value="2" />
              <Tab label="비밀번호 찾기" value="3" />
            </TabList>
            <DialogContent>
              <div>
                <TabPanel value="0">
                  <form onSubmit={onSubmit}>
                    <div className="id">
                      <p>아이디 입력하세요</p>
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
                    </div>
                    <div className="pw">
                      <p>패스워드 입력하세요</p>
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
                    <DialogActions>
                      <Button variant="contained" color="primary" type="submit">
                        로그인
                      </Button>
                    </DialogActions>
                  </form>
                </TabPanel>
                <TabPanel value="1">
                  <Signin handlesub={handlesub} />

                  <Dialog
                    open={this.state.signin}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        <div className="pp">
                          <div className="partynight">
                            <img
                              src={congratulation}
                              width="30px"
                              height="30px"
                              id="party"
                              alt=""
                            />
                            <p>축하합니다</p>
                            <img
                              src={congratulation}
                              width="30px"
                              height="30px"
                              id="party2"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="pp2">
                          <p id="dialog">
                            창원대의 밤 회원가입을 진심으로 축하드립니다 이제
                            창원대의 밤 커뮤니티를 마음껏 즐기세요.
                          </p>
                        </div>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleClose}
                        variant="contained"
                        color="primary"
                      >
                        <p>확인</p>
                      </Button>
                    </DialogActions>
                  </Dialog>
                </TabPanel>
                <TabPanel value="2">
                  <form onSubmit={this.id_findonSubmit}>
                    <div className="id">
                      <p>E-mail 입력하세요</p>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        label="E-mail"
                        type="text"
                        name="emailfound"
                        value={this.state.emailfound}
                        onChange={onChange}
                      />
                      <div className="email_idfound">@changwon.ac.kr</div>
                    </div>
                    <DialogActions>
                      <Button variant="contained" color="primary" type="submit">
                        아이디찾기
                      </Button>
                    </DialogActions>
                  </form>
                </TabPanel>
                <TabPanel value="3">
                  <form onSubmit={this.pw_findonSubmit}>
                    <div className="id">
                      <p>E-mail 입력하세요</p>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        label="E-mail"
                        type="text"
                        name="emailfound"
                        value={this.state.emailfound}
                        onChange={onChange}
                      />
                    </div>
                    <div className="pw">
                      <p>아이디 입력하세요</p>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        label="id"
                        type="text"
                        name="id"
                        value={id}
                        onChange={onChange}
                      />
                    </div>
                    <DialogActions>
                      <Button variant="contained" color="primary" type="submit">
                        비밀번호 찾기
                      </Button>
                      {this.state.progress}
                    </DialogActions>
                  </form>
                </TabPanel>
              </div>
            </DialogContent>
          </div>
        </TabContext>
        {/* 여기서 부터 다이어로그는 아이디를 보여주는 것*/}
        <Dialog
          open={this.state.idopen}
          onClose={this.handleClose2}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogContent>
            <DialogContentText>
              창원대의 밤 아이디는 {this.state.idfound} 입니다.
            </DialogContentText>
          </DialogContent>
        </Dialog>
        {/* 여까지 다이어로그는 아이디를 보여주는 것*/}
      </div>
    );
  }
}

export default Login;
