import React from 'react';
import TopAppbar from "../../appbar/appbar";
import TextField from '@material-ui/core/TextField';
import './roommarket_write.css';
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";
import BottomMenu from '../../bottommenu/bottommenu';
import NestedList from "../../menulist/Board_list";
import ImageUploader from 'react-images-upload';
import swal from 'sweetalert';
import { ToastContainer, toast } from "react-toastify";
import Error from "@material-ui/icons/Error";
import Check from "@material-ui/icons/Check";
import "react-toastify/dist/ReactToastify.css";
import Search from "../../SearchBar/searchbar";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class Roommarket_write extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cardBody:"", //본문
            location:"", //위치
            deposit:"",  //보증금
            monthlyrent:"",  //월세
            mode:'', //구조
            options:{냉장고:false, 세탁기:false, 에어컨:false,
                    TV:false, 인덕션:false, 가스레인지:false, 전자레인지:false, wifi:false,
                    인터넷선:false, 침대:false, 옷장:false, 신발장:false, 
                    책상:false, 책장:false, 싱크대:false},
            pictures: []
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.goBack = this.goBack.bind(this);
        this.onDrop = this.onDrop.bind(this);

    }
    onDrop(pictureFiles, pictureDataURLs) {
        this.setState({
            pictures: pictureDataURLs
        });
        
    }
onChange(e){
    this.setState({
        [e.target.name]: e.target.value,
    });
}

handleRadioChange = (e) => {
    this.setState({
        mode: e.target.value
    });
};
optionChange =(e)=>{
    this.setState({
        options: {
            ...this.state.options,
            [e.target.name]: e.target.checked
        }
    })
}
goBack() {
    this.props.history.goBack();
  }
onSubmit(e){
    e.preventDefault();
    if(this.state.cardBody==""|| this.state.location==""|| this.state.deposit=="" || this.state.monthlyrent==""|| this.state.mode==""){
    toast.error(
        <div>
          <Error />
          <div className="toast">
            <p>필수항목(*)을 입력하세요!</p>
          </div>
        </div>
      );
    }
    else{
        var options='';
        Object.entries(this.state.option).map(([key,value])=>{
            if(value===true){
                if(options==='')
                    options=key;
                else
                    options=options+","+key;
            }
        })
            const post ={
                mode:this.state.mode,
                option:options,
                price:this.state.deposit+'/'+this.state.monthlyrent,
                location:this.state.location,  //위치
                content:this.state.content,   //세부내용
                nickname:JSON.parse(localStorage.getItem('user')).nickname,
            }
            //게시글 저장하는 함수 넣을 자리
            fetch('http://localhost:3001/api/',{
                method: "post",
                headers : {
                    'content-type':'application/json'
                },
                body:JSON.stringify(post)
            })
            .then(
                toast.success(
                  <div>
                    <Check />
                    <div className="toast">
                      <p>게시글이 등록되었습니다.</p>
                    </div>
                  </div>
                )
              )
            .then(window.history.back());
        
    }
}    
    componentWillMount(){
        if(JSON.parse(localStorage.getItem("user")) == null){
            swal({
              title: "로그인해 주세요!",
              icon: "warning",
            })
            this.props.history.goBack();        
          }
    }

    render() {

        if(JSON.parse(localStorage.getItem("user")) == null){
            return(
              <>
              </>
            )
        }
        else{
        return(
            <div className="roommarket_write_div">
                <TopAppbar />
                <div className="board_title">
                    <Typography variant="h3">자취방 마켓</Typography>
                </div>
                <div className="searchbar">
                <Search />
                </div>
                <div className="menubarbar">
                <NestedList />
                </div>
            <div className="card_write_paper">
              <div className="card_write_content">
                <form onSubmit={this.onSubmit}>
                    <div className="club_picture_insert">  
                    <ImageUploader
                    withIcon={false}
                    buttonText='이미지를 선택하세요.'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    withPreview={true}
                    />
                    </div>
                    <Typography id="room_title">* 제목</Typography>
                    <div className="cardTitle">
                        <TextField id="cardTitle" type="text" name="cardTitle" value={this.state.cardTitle} onChange={this.onChange} placeholder="제목을 입력해 주세요"></TextField>
                    </div>
                    <br/>
                    <Typography id="room_title">* 보증금</Typography>
                    <div className="deposit">
                        <TextField id="deposit" type="number" name="deposit" value={this.state.deposit} onChange={this.onChange} placeholder="ex) 500"></TextField>
                    </div>
                    <br/>
                    <Typography id="room_title">* 월세</Typography>
                    <div className="monthlyrent">
                        <TextField id="monthlyrent" type="number" name="monthlyrent" value={this.state.monthlyrent} onChange={this.onChange} placeholder="ex) 20" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"></TextField>
                    </div>

                    <br/>
                    <Typography id="room_title">* 위치</Typography>
                    <div className ="location">
                        <TextField id="location" type="text"  name="location" value={this.state.location} onChange={this.onChange} placeholder="ex) 학교 정문과 5분 거리"></TextField>
                    </div>
                
                    <br/>
                    <Typography id="room_title">* 구조</Typography>
                        <RadioGroup name="mode" value={this.state.mode} onChange={this.handleRadioChange} row>
                            <FormControlLabel  value="투룸" control={<Radio color="primary"/>} label="투룸" />
                            <FormControlLabel value="분리형(방1,거실1)" control={<Radio color="primary"/>} label="분리형(방1,거실1)" />
                            <FormControlLabel value="오픈형(방1)" control={<Radio color="primary"/>} label="오픈형(방1)" />
                            <FormControlLabel value="복층형" control={<Radio color="primary"/>} label="복층형" />
                            <FormControlLabel value="기타" control={<Radio color="primary"/>} label="기타" />
                        </RadioGroup>
                    <br/>

                    <Typography id="room_title">옵션</Typography>
                
                <FormGroup row>
                    <FormControlLabel label="냉장고"
                        control={<Checkbox color="primary" checked={this.state.options.냉장고} name="냉장고"  onChange={this.optionChange} />}/>
                        <FormControlLabel label="세탁기"
                        control={<Checkbox color="primary" checked={this.state.options.세탁기} name="세탁기" onChange={this.optionChange}  />}/>
                    <FormControlLabel label="에어컨"
                        control={<Checkbox color="primary" checked={this.state.options.에어컨} name="에어컨" onChange={this.optionChange}  />}/>
                    <FormControlLabel label="TV"
                        control={<Checkbox color="primary" checked={this.state.options.TV} name="TV" onChange={this.optionChange}  />}/>
                    <FormControlLabel label="인덕션"
                        control={<Checkbox color="primary" checked={this.state.options.인덕션} name="인덕션" onChange={this.optionChange}  />}/>
                    <FormControlLabel label="가스레인지"
                        control={<Checkbox color="primary" checked={this.state.options.가스레인지} name="가스레인지" onChange={this.optionChange}  />}/>
                    <FormControlLabel label="전자레인지"
                        control={<Checkbox color="primary" checked={this.state.options.전자레인지} name="전자레인지"  onChange={this.optionChange} />}/>
                    <FormControlLabel label="wifi"
                        control={<Checkbox color="primary" checked={this.state.options.wifi} name="wifi" onChange={this.optionChange}  />} />
                    <FormControlLabel label="인터넷선"
                        control={<Checkbox color="primary" checked={this.state.options.인터넷선} name="인터넷선" onChange={this.optionChange}  />} />
                    <FormControlLabel label="침대"
                        control={<Checkbox color="primary" checked={this.state.options.침대} name="침대"  onChange={this.optionChange} />} />
                    <FormControlLabel label="옷장"
                        control={<Checkbox color="primary" checked={this.state.options.옷장} name="옷장"  onChange={this.optionChange} />} />
                    <FormControlLabel label="신발장"
                        control={<Checkbox color="primary" checked={this.state.options.신발장} name="신발장" onChange={this.optionChange}  />}/> 
                    <FormControlLabel label="책상"
                        control={<Checkbox color="primary" checked={this.state.options.책상} name="책상" onChange={this.optionChange}  />}/>
                    <FormControlLabel label="책장"
                        control={<Checkbox color="primary" checked={this.state.options.책장} name="책장" onChange={this.optionChange}  />}/> 
                    <FormControlLabel label="싱크대"
                        control={<Checkbox color="primary" checked={this.state.options.싱크대} name="싱크대" onChange={this.optionChange}  />}/>
                </FormGroup>
                    <br/>
                    <div className="cardBody">
                    <Typography id="room_title">* 게시글에 작성될 내용을 입력해 주세요.</Typography>
                        <br/>
                         <TextField
                            className="cardBody"
                            id="cardBody" 
                            rows={7}
                            multiline 
                            name="cardBody"  
                            variant="outlined"
                            value={this.state.cardBody} 
                            onChange={this.onChange}/>
                    </div>
                    <div className="room_write_button_box">
                        <Button 
                            className="commit"
                            id="submit" 
                            type="submit" 
                            variant="contained" 
                            color="primary">
                            등록
                        </Button>
                        <Button 
                            className="cancel"
                            id="cancel" 
                            variant="contained" 
                            color="secondary" 
                            onClick={this.goBack}>
                            취소
                        </Button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
        <div className="roommarket_write_bottommenu">
          <BottomMenu/>
          </div>
        </div>
        );
    }
}
}
export default Roommarket_write;