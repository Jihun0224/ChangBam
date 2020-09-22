/* eslint-disable */ //eslint경고 삭제
import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import "./meeting.css";
import FormHelperText from "@material-ui/core/FormHelperText";

class Meeting_Write extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      head_count: "", //인원 수
      gender: "", //성별
      introduce: "", //소개
      tel: "", //연락처
      deadline: "", //마감일
      anchorEl: null,
      open: false,
      date: "",
    };
    this.onChange = this.onChange.bind(this);
    this.handleopen = this.handleopen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    e.preventDefault();
    window.location.reload(false);
    const post = {
      head_count: this.state.head_count,
      gender: this.state.gender,
      tel: this.state.tel,
      deadline: this.state.deadline,
      introduce: this.state.introduce,
      user_id: JSON.parse(localStorage.getItem("user")).key,
    };
    fetch("api/meeting_write", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleChange(e) {
    this.setState({
      head_count: e.target.value,
    });
  }
  handleChange2(e) {
    this.setState({
      deadline: e.target.value,
    });
  }
  handleopen(e) {
    this.setState({
      anchorEl: e.currentTarget,
      open: Boolean(e.currentTarget),
    });
  }
  handleClose(e) {
    this.setState({
      anchorEl: null,
      open: false,
    });
  }
  render() {
    const { head_count, gender, introduce, tel, deadline } = this.state;
    const { onChange, handleopen, handleClose, onClick } = this;
    return (
      <div className="meeting" noValidate autoComplete="off">
        <form>
          <Button variant="contained" color="primary" onClick={handleopen}>
            글쓰기
          </Button>
          <Dialog
            open={this.state.open}
            aria-labelledby="form-dialog-title"
            className="meeting_apply"
          >
            <DialogContent className="meeting_apply_card">
              <FormControl className="head_count_select">
                <InputLabel id="head_count_select">인원</InputLabel>
                <Select
                  labelId="head_count_select"
                  id="head_count_select"
                  fullWidth="220px"
                  value={this.state.head_count}
                  onChange={this.handleChange}
                >
                  <MenuItem value={1}>1명</MenuItem>
                  <MenuItem value={2}>2명</MenuItem>
                  <MenuItem value={3}>3명</MenuItem>
                  <MenuItem value={4}>4명</MenuItem>
                  <MenuItem value={5}>5명</MenuItem>
                  <MenuItem value={6}>6명</MenuItem>
                  <MenuItem value={7}>7명</MenuItem>
                  <MenuItem value={8}>8명</MenuItem>
                  <MenuItem value={9}>9명</MenuItem>
                  <MenuItem value={10}>10명</MenuItem>
                  <MenuItem value={11}>10+</MenuItem>
                </Select>
              </FormControl>

              <FormControl className="gender_select">
                <FormLabel component="legend">성별</FormLabel>

                <RadioGroup
                  aria-label="gender"
                  name="gender"
                  value={this.state.gender}
                  onChange={onChange}
                >
                  <FormControlLabel
                    value="여자"
                    control={<Radio />}
                    label="여자"
                  />
                  <FormControlLabel
                    className="radio_male"
                    value="남자"
                    control={<Radio />}
                    label="남자"
                  />
                </RadioGroup>
              </FormControl>

              <FormControl className="meeting_impormation">
                <TextField
                  id="outlined-basic"
                  label="소개"
                  variant="outlined"
                  size="small"
                  type="text"
                  multiline
                  rows={4}
                  name="introduce"
                  onChange={onChange}
                />
                <br />
                <TextField
                  id="outlined-basic"
                  label="연락처"
                  variant="outlined"
                  size="small"
                  type="text"
                  name="tel"
                  onChange={onChange}
                />
                <br />
                <form className="deadline_form" noValidate>
                  <TextField
                    id="deadline"
                    label="마감일"
                    type="date"
                    value={this.state.deadline}
                    className="deadline"
                    fullWidth="220px"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={this.handleChange2}
                  />
                </form>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="primary" onClick={onClick}>
                등록
              </Button>
              <Button variant="outlined" color="primary" onClick={handleClose}>
                닫기
              </Button>
            </DialogActions>
          </Dialog>
          {console.log(this.state.deadline)}
        </form>
      </div>
    );
  }
}

export default Meeting_Write;
