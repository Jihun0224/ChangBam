import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/AddAPhoto';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/input';
import InputLabel from '@material-ui/core/InputLabel';
import './roomwrite.css';
import Mac from './mac.jpg';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';

class RoomWrite extends React.Component{

    constructor(props){
        super(props);
        this.state={
            mode:'', //구조
            option:{냉장고:false, 세탁기:false, 에어컨:false,
                 TV:false, 인덕션:false, 가스레인지:false, 전자레인지:false, wifi:false,
                  인터넷선:false, 침대:false, 옷장:false, 신발장:false, 
                  책상:false, 책장:false, 싱크대:false},
            deposit:0,  //보증금
            monthlyrent:0,  //월세
            location:'',  //위치
            content:'',   //세부내용
            nickname:'',
            postNum:0
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    componentWillMount(){
        this.setState({
            nickname:JSON.parse(localStorage.getItem('user')).nickname
        })
        if(isNaN(Number(window.location.href.slice(window.location.href.indexOf('?') + 1)))){
            console.log("수정하는 링크가 아님 (처음작성하는 게시글)");
        }else{
            const post ={
                postNum: Number(window.location.href.slice(window.location.href.indexOf('?') + 1))
            }
            this.setState({
                postNum:post.postNum
            })
            console.log("게시글 번호",post.postNum);

            fetch('http://localhost:3001/api/getroompost',{
            method: "post",
            headers : {
                'content-type':'application/json'
            },
            body:JSON.stringify(post)
            })
            .then(res => res.json())
            .then(json =>{
                console.log("게시글 내용 : ", json[0]);
                //옵션 다시 set하기
                if(json[0].card_options!==null){
                    (json[0].card_options).split(",").map((opt)=>
                        this.setState({
                            option: {
                                ...this.state.option,
                                [opt]: true
                            }
                        })
                    )
                }

                var roomprice = json[0].card_price.split("/");
                this.setState({
                    mode:json[0].card_subtitle,
                    deposit:Number(roomprice[0]),  //보증s금
                    monthlyrent:Number(roomprice[1]),  //월세
                    location:json[0].card_location,  //위치
                    content:json[0].card_body,   //세부내용
                })
            })
        }
    }
    onChange(e){
        console.log("onchange");
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    init =()=>{
        this.setState({
            mode:'', //구조
            option:{냉장고:false, 세탁기:false, 에어컨:false,
                 TV:false, 인덕션:false, 가스레인지:false, 전자레인지:false, wifi:false,
                  인터넷선:false, 침대:false, 옷장:false, 신발장:false, 
                  책상:false, 책장:false, 싱크대:false},
            deposit:0,  //보증금
            monthlyrent:0,  //월세
            location:'',  //위치
            content:'',   //세부내용
            nickname:'',
            postNum:0
        })
    }

    onSubmit(e){
        e.preventDefault();
        console.log("state: ",this.state);
        
        if(this.state.mode=='' ||this.state.content=='' ||this.state.location=='')
            alert("필수항목 *을 입력하세요");
        else{
            //옵션 스트링화 하기
            var options='';
            Object.entries(this.state.option).map(([key,value])=>{
                if(value===true){
                    if(options==='')
                        options=key;
                    else
                        options=options+","+key;
                }
            })
           var roomprice= this.state.deposit+'/'+this.state.monthlyrent;

            if(this.state.postNum===0){

                const post ={
                    mode:this.state.mode,
                    option:options,
                    price:roomprice,
                    location:this.state.location,  //위치
                    content:this.state.content,   //세부내용
                    nickname:this.state.nickname
                }
                fetch('http://localhost:3001/api/room',{
                    method: "post",
                    headers : {
                        'content-type':'application/json'
                    },
                    body:JSON.stringify(post)
                })
                .then(()=>{
                    this.init();
                }).then(document.location.href="/room")

            }else{
                const post ={
                    mode:this.state.mode,
                    option:options,
                    price:roomprice,
                    location:this.state.location,  //위치
                    content:this.state.content,   //세부내용
                    postNum:this.state.postNum
                }

                fetch('http://localhost:3001/api/roomupdate',{
                    method: "post",
                    headers : {
                        'content-type':'application/json'
                    },
                    body:JSON.stringify(post)
                })
                .then(() =>{
                   this.init();
                }).then(document.location.href="/room")
            }
        }
    }

    goBack=()=>{         
        if(this.state.postNum===0){
            document.location.href="/room";
        }else{
            document.location.href='/2?'+this.state.postNum; 
        }
    } 

    handleRadioChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    optionChange =(e)=>{
        this.setState({
            option: {
                ...this.state.option,
                [e.target.name]: e.target.checked
            }
        })
    }

    render() {
        return(
        <Paper id="paper">
            <div className="background">
            <form onSubmit={this.onSubmit}>
                <div className="picture">
                    <input accept="image/*" id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                        <IconButton id="Icon" color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                    <IconButton id="Icon">
                        <KeyboardArrowLeftIcon/>
                    </IconButton>
                            <img src={Mac} />
                            <img src={Mac} />
                    <IconButton id="Icon">
                        <KeyboardArrowRightIcon/>
                    </IconButton>
                </div>
            
                <p id="depositText">보증금 ex)200 :</p>
                <div className="deposit">
                        <TextField id="deposit" type="text" name="deposit" value={this.state.deposit} onChange={this.onChange}></TextField>
                </div>
                
                <p id="monthlyrentText">월세 ex)20:</p>
                <div className="monthlyrent">
                        <TextField id="monthlyrent" type="text" name="monthlyrent" value={this.state.monthlyrent} onChange={this.onChange}></TextField>
                </div>

                <br/>
                <p id="locationText">* 상세주소 : </p>
                <div className ="location">
                    <TextField id="location" type="text"  name="location" value={this.state.location} onChange={this.onChange}></TextField>
                </div>
                
                <p id="optionText">* 구조</p>
                     
            
               
                <RadioGroup name="mode" value={this.state.mode} onChange={this.handleRadioChange} row>
                    <FormControlLabel  value="투룸" control={<Radio />} label="투룸" />
                    <FormControlLabel value="분리형(방1,거실1)" control={<Radio />} label="분리형(방1,거실1)" />
                    <FormControlLabel value="오픈형(방1)" control={<Radio />} label="오픈형(방1)" />
                    <FormControlLabel value="복층형" control={<Radio />} label="복층형" />
                </RadioGroup>
                    
        
                <p id="optionText">옵션 </p>
                
                <FormGroup row>
                    <FormControlLabel label="냉장고"
                        control={<Checkbox checked={this.state.option.냉장고} name="냉장고"  onChange={this.optionChange} />}/>
                        <FormControlLabel label="세탁기"
                        control={<Checkbox checked={this.state.option.세탁기} name="세탁기" onChange={this.optionChange}  />}/>
                    <FormControlLabel label="에어컨"
                        control={<Checkbox checked={this.state.option.에어컨} name="에어컨" onChange={this.optionChange}  />}/>
                    <FormControlLabel label="TV"
                        control={<Checkbox checked={this.state.option.TV} name="TV" onChange={this.optionChange}  />}/>
                    <FormControlLabel label="인덕션"
                        control={<Checkbox checked={this.state.option.인덕션} name="인덕션" onChange={this.optionChange}  />}/>
                    <FormControlLabel label="가스레인지"
                        control={<Checkbox checked={this.state.option.가스레인지} name="가스레인지" onChange={this.optionChange}  />}/>
                    <FormControlLabel label="전자레인지"
                        control={<Checkbox checked={this.state.option.전자레인지} name="전자레인지"  onChange={this.optionChange} />}/>
                    <FormControlLabel label="wifi"
                        control={<Checkbox checked={this.state.option.wifi} name="wifi" onChange={this.optionChange}  />} />
                    <FormControlLabel label="인터넷선"
                        control={<Checkbox checked={this.state.option.인터넷선} name="인터넷선" onChange={this.optionChange}  />} />
                    <FormControlLabel label="침대"
                        control={<Checkbox checked={this.state.option.침대} name="침대"  onChange={this.optionChange} />} />
                    <FormControlLabel label="옷장"
                        control={<Checkbox checked={this.state.option.옷장} name="옷장"  onChange={this.optionChange} />} />
                    <FormControlLabel label="신발장"
                        control={<Checkbox checked={this.state.option.신발장} name="신발장" onChange={this.optionChange}  />}/> 
                    <FormControlLabel label="책상"
                        control={<Checkbox checked={this.state.option.책상} name="책상" onChange={this.optionChange}  />}/>
                    <FormControlLabel label="책장"
                        control={<Checkbox checked={this.state.option.책장} name="책장" onChange={this.optionChange}  />}/> 
                    <FormControlLabel label="싱크대"
                        control={<Checkbox checked={this.state.option.싱크대} name="싱크대" onChange={this.optionChange}  />}/>
                </FormGroup>
                
                <p id="contentText">* 게시글에 작성될 내용을 입력해주세요.</p>
                <div className="content">
                    <TextField id="content" type="text" rowsMax={10} multiline label="" variant="outlined" name="content" value={this.state.content} onChange={this.onChange}></TextField>
                </div>

                <Button className="cancel" variant="contained" color="secondary" id="cancel" margin-left="20px" onClick={this.goBack} >취소</Button>
                 
                <Button id="writing_button" type="submit" variant="contained" color="primary">글쓰기</Button>
                </form>
            </div>
        </Paper>
        );
    }
}
export default RoomWrite;