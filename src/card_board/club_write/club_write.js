import React from 'react';
import TopAppbar from "../../appbar/appbar";
import TextField from '@material-ui/core/TextField';
import './club_write.css';
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";
import BottomMenu from '../../bottommenu/bottommenu';
import Sidemenu from "../../sidemenu/sidemenu";
import ImageUploader from 'react-images-upload';
import swal from 'sweetalert';
import { ToastContainer, toast } from "react-toastify";
import Error from "@material-ui/icons/Error";
import "react-toastify/dist/ReactToastify.css";
import Search from "../../SearchBar/searchbar";
class Club_write extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cardTitle:"",       
            cardSubtitle:"",    //동아리명
            cardSlogan:"",    
            cardCategory:"",    //동아리 카테고리
            cardBody:"",
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
    if(this.state.cardTitle==""|| this.state.cardSubtitle==""|| this.state.cardSlogan=="" ||this.state.cardBody==""||this.state.cardCategory==""){
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
                cardTitle:this.state.cardTitle,
                cardSubtitle:this.state.cardSubtitle, //동아리명
                cardSlogan:this.state.cardSlogan,
                cardCategory:this.state.cardCategory,
                cardBody:this.state.cardBody,
                nickname:JSON.parse(localStorage.getItem('user')).nickname,
            }
            fetch('http://localhost:3001/api/club_write',{
                method: "post",
                headers : {
                    'content-type':'application/json'
                },
                body:JSON.stringify(post)
            })
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
                <Sidemenu />
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
                    <div className="cardTitle">
                        <TextField 
                            id="cardTitle" 
                            label="제목"  
                            type="text" 
                            name="cardTitle"  
                            value={this.state.cardTitle} 
                            onChange={this.onChange}/>
                    </div><br/>
                    <div className="clubSubTitle">
                        <TextField 
                            id="clubSubTitle" 
                            label="동아리명"  
                            type="text" 
                            name="cardSubtitle"  
                            value={this.state.cardSubtitle} 
                            onChange={this.onChange}/>
                    </div>
                    <br/>
                    <div className="clubCategory">
                        <TextField 
                            id="clubCategory" 
                            label="카테고리"
                            placeholder="ex) 음악동아리, 치어리딩동아리"  
                            type="text" 
                            name="cardCategory"  
                            value={this.state.cardCategory} 
                            onChange={this.onChange} />
                    </div>
                    <br/>
                    <div className="cardSlogan">
                        <TextField 
                            id="cardSlogan" 
                            rowsMax={2}  
                            type="text" 
                            multiline 
                            label="슬로건을 적어주세요.(짧은 홍보글. 게시판 메인에서 보일 글입니다.)" 
                            name="cardSlogan"
                            value={this.state.cardSlogan} 
                            onChange={this.onChange}/>
                    </div>
                    <br/><br/>
                    <div className="cardBody">
                         <TextField
                            className="cardbody"
                            id="cardBody" 
                            rows={7}
                            multiline 
                            label="세부 홍보글" 
                            name="cardBody"  
                            variant="outlined"
                            value={this.state.cardBody} 
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