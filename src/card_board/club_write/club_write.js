import React from 'react';
import TopAppbar from "../../appbar/appbar";
import TextField from '@material-ui/core/TextField';
import './club_write.css';
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
class Club_write extends React.Component{
    constructor(props){
        super(props);
        this.state={
            clubTitle:"",
            clubSubtitle:"",
            clubShowbody:"",
            clubBody:"",
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
goBack() {
    this.props.history.goBack();
  }
onSubmit(e){
    e.preventDefault();
    if(this.state.clubTitle==""|| this.state.clubSubtitle==""|| this.state.clubShowbody=="" ||this.state.clubBody==""){
    toast.error(
        <div>
          <Error />
          <div className="toast">
            <p>내용을 입력하세요!</p>
          </div>
        </div>
      );
    }
    else{
        
            const post ={
                clubTitle:this.state.clubTitle,
                clubSubtitle:this.state.clubSubtitle,
                clubShowbody:this.state.clubShowbody,
                clubBody:this.state.clubBody,
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
            <div className="club_write_div">
                <TopAppbar />
                <div className="board_title">
                    <Typography variant="h3">동아리홍보</Typography>
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
                <ToastContainer />
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