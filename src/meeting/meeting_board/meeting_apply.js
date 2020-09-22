/* eslint-disable */       //eslint경고 삭제
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import './meeting.css';
class Meeting_Apply extends React.Component{
    constructor(props){
        super(props);
        this.state={
            head_count:'', //인원 수
            gender:'', //성별
            introduce:'',//소개
            tel:'',//연락처
            deadline: '', //마감일
            anchorEl : null,
            open:false

        };
        this.onChange = this.onChange.bind(this);
        this.handleopen = this.handleopen.bind(this);
        this.handleClose = this.handleClose.bind(this);     
    }
    onChange(e){
        this.setState({
            [e.target.name]: e.target.value,
          });
    }
    handleopen(e){
        this.setState({
            anchorEl: e.currentTarget,
            open:Boolean(e.currentTarget)
        })
      }
      handleClose (e){
       
        this.setState({
            anchorEl:null,
            open:false
            
        })
      }
    render(){
        const {head_count,gender,introduce,tel,deadline} = this.state;
        const {onChange,handleopen,handleClose} = this;
        return(
            <div className="meeting" noValidate autoComplete="off">

                <form>
                    <Button variant="outlined" color="primary" onClick={this.handleopen}>신청</Button>

                    <Dialog open={this.state.open} aria-labelledby="form-dialog-title" className="meeting_apply">
                        <DialogContent className="meeting_apply_card">              
                            <FormControl className="head_count_select">
                                <InputLabel id="head_count_select">인원</InputLabel>
                                <Select
                                    labelId="head_count_select"
                                    id="head_count_select"
                                    fullWidth="220px"
                                    value={this.head_count}
                                    onChange={onchange}
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
                                </Select>
                            </FormControl>
                            <FormControl className="gender_select">                   
                                <FormLabel component="legend">성별</FormLabel>
                                <RadioGroup aria-label="gender" name="gender" value={this.gender} onChange={onChange}>
                                    <FormControlLabel value="female" control={<Radio />} label="여자" />
                                    <FormControlLabel className="radio_male" value="male" control={<Radio />} label="남자" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl className = "meeting_impormation">
                                <TextField id="outlined-basic" label="소개" variant="outlined"size="small"type="text"multiline rows={4} name="introduce"  onChange={onChange} /><br/>
                                <TextField id="outlined-basic" label="연락처" variant="outlined"size="small"type="text" name="tel"  onChange={onChange} /><br/>
                                <form className="deadline_form" noValidate></form>
                            </FormControl>
                        </DialogContent>
                        
                        <DialogActions>
                            <Button variant="contained" color="primary" /*onClick={this.handleFormSubmit}*/>신청</Button>
                            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                        </DialogActions>
                    </Dialog>
               
                </form>
               
            </div>
            
        )
    }

}

export default Meeting_Apply;