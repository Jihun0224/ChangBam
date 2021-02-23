import React from 'react';
import TopAppbar from "../../appbar/appbar";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/AddAPhoto';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import './club_write.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";
import BottomMenu from '../../bottommenu/bottommenu';
import NestedList from "../../menulist/Board_list";
import ImageUploader from 'react-images-upload';


class Club_write extends React.Component{
    constructor(props){
        super(props);
        this.state={
            clubTitle:"",
            clubSubtitle:"",
            clubShowbody:"",
            clubBody:"",
            postNum:0,
            pictures: []
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.goBack = this.goBack.bind(this);
        this.onDrop = this.onDrop.bind(this);

    }

    componentWillMount(){

            const post ={
                postNum: Number(window.location.href.slice(window.location.href.indexOf('?') + 1))
            }
            this.setState({
                postNum:post.postNum
            })
            fetch('http://localhost:3001/api/getclubpost',{
            method: "post",
            headers : {
                'content-type':'application/json'
            },
            body:JSON.stringify(post)
            })
            .then(res => res.json())
            .then(json =>{
                this.setState({
                    clubTitle:json[0].card_title,
                    clubSubtitle:json[0].card_subtitle,
                    clubShowbody:json[0].card_showbody,
                    clubBody:json[0].card_body,
                })
            })
        }
    
    onDrop(pictureFiles, pictureDataURLs) {
            this.setState({
                pictures: pictureFiles
            });
        }
    onChange(e){
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    goBack() {
        this.props.history.goBack();
      }
    onSubmit(e){
        e.preventDefault();

        if(this.state.clubTitle==''|| this.state.clubSubtitle==''|| this.state.clubShowbody=='' ||this.state.clubBody=='')
            alert("내용을 입력하세요");
            
        else{
            
            if(this.state.postNum===0){
                const post ={
                    clubTitle:this.state.clubTitle,
                    clubSubtitle:this.state.clubSubtitle,
                    clubShowbody:this.state.clubShowbody,
                    clubBody:this.state.clubBody,
                    nickname:JSON.parse(localStorage.getItem('user')).nickname,
                }
                fetch('http://localhost:3001/api/ClubPostageWrite',{
                    method: "post",
                    headers : {
                        'content-type':'application/json'
                    },
                    body:JSON.stringify(post)
                })
                .then(res => res.json())
                .then(document.location.href="/club")
            }else{
                const post ={
                    clubTitle:this.state.clubTitle,
                    clubSubtitle:this.state.clubSubtitle,
                    clubShowbody:this.state.clubShowbody,
                    clubBody:this.state.clubBody,
                    postNum:this.state.postNum
                }
                fetch('http://localhost:3001/api/clubupdate',{
                    method: "post",
                    headers : {
                        'content-type':'application/json'
                    },
                    body:JSON.stringify(post)
                })
                .then(res => res.json())
                .then(json =>{
                    this.setState({
                        clubTitle:'',
                        clubSubtitle:'',
                        clubShowbody:'',
                        clubBody:'',
                        nickname:'',
                        postNum:0
                    })
                }).then(document.location.href="/club")
            }
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
            <div className="club_write_div">
                <TopAppbar />
                <div className="board_title">
                    <Typography variant="h3">동아리홍보</Typography>
                </div>
                <div className="menubarbar">
                <NestedList />
                </div>
            <div className="card_write_paper">
              <div className="card_write_content">
                <form onSubmit={this.onSubmit}>
                    <div className="club_picture_insert">  
                    <ImageUploader
                    withIcon={true}
                    buttonText='이미지를 선택하세요.'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    withPreview={true}
                    />
                        {/* <input accept="image/*" id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">   카메라 아이콘
                            <IconButton id="Icon" color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                        
                        <IconButton id="Icon">
                            <KeyboardArrowLeftIcon/>
                        </IconButton>
                        
                        <IconButton id="Icon">
                            <KeyboardArrowRightIcon/>
                        </IconButton> */}
                    </div>

                    <div className="clubTitle">
                        <TextField 
                            id="clubTitle" 
                            label="동아리명"  
                            type="text" 
                            name="clubTitle"  
                            value={this.state.clubTitle} 
                            onChange={this.onChange}/>
                    </div>
                    <br/>
                    <div className="clubCategory">
                        <TextField 
                            id="clubCategory" 
                            label="카테고리 ex) 음악동아리, 치어리딩동아리"  
                            type="text" 
                            name="clubSubtitle"  
                            value={this.state.clubCategory} 
                            onChange={this.onChange} />
                    </div>
                    <br/>
                    <div className="clubShowbody">
                        <TextField 
                            id="clubShowbody" 
                            rowsMax={2}  
                            type="text" 
                            multiline 
                            label="슬로건을 적어주세요.(짧은 홍보글. 게시판 메인에서 보일 글입니다.)" 
                            name="clubShowbody"
                            value={this.state.clubShowbody} 
                            onChange={this.onChange}/>
                    </div>
                    <br/>
                    <div className="clubBody">
                         <TextField
                            className="clubbody"
                            id="clubBody" 
                            rows={7}
                            multiline 
                            label="세부 홍보글" 
                            name="clubBody"  
                            variant="outlined"
                            value={this.state.clubBody} 
                            onChange={this.onChange}/>
                    </div>
                    <div className="card_write_button_box">
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
            </div>
        </div>
        <div className="club_write_bottommenu">
          <BottomMenu/>
          </div>
        </div>
        );
    }
}
}
export default Club_write;