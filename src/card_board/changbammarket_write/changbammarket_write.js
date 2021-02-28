import React from 'react';
import TopAppbar from "../../appbar/appbar";
import TextField from '@material-ui/core/TextField';
import './changbammarket_write.css';
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
class ChangbamMarket extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cardTitle:"",
            location:"",
            price:"",
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
    if(this.state.cardTitle==""|| this.state.location==""|| this.state.price=="" ||this.state.cardBody==""){
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
                location:this.state.location,
                price:this.state.price,
                cardBody:this.state.cardBody,
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
            <div className="market_write_div">
                <TopAppbar />
                <div className="board_title">
                    <Typography variant="h3">창밤인 마켓</Typography>
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
                    <div className="card_picture_insert">  
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
                            value={this.state.cardTitle} 
                            onChange={this.onChange}/>
                    </div>
                    <br/>
                    <div className="marketSubTitle">
                        <TextField 
                            id="marketTitle" 
                            label="상품명"  
                            type="text" 
                            value={this.state.cardSubTitle} 
                            onChange={this.onChange}/>
                    </div>
                    <br/>
                    <div className="marketPrice">
                    <TextField 
                            id="marketPrice" 
                            label="가격"  
                            type="number" 
                            name="price"
                            placeholder="ex) 10000"
                            value={this.state.price} 
                            onChange={this.onChange} />
                    </div>
                    <br/>
                    <div className="marketLocation">
                    <TextField
                            id="marketLocation" 
                            type="text" 
                            label="위치" 
                            name="location"
                            placeholder="ex) 사림동"
                            value={this.state.location} 
                            onChange={this.onChange}/>
                      
                    </div>
                    <br/><br/>
                    <div className="cardBody">
                         <TextField
                            className="cardbody"
                            id="cardBody" 
                            rows={7}
                            multiline 
                            label="상품 설명" 
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
        <div className="market_write_bottommenu">
          <BottomMenu/>
          </div>
        </div>
        );
    }
}
}
export default ChangbamMarket;