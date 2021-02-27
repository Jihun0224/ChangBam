import React, { Component } from 'react';
import Img from './dongali.png';
import Userimg from '../../market/marketmain/doctor.png';
import Button from '@material-ui/core/Button';

class Dongali extends Component{
    constructor(props){
        super(props);
        this.state={
            postNum:0,
            clubTitle:'',
            clubShowbody:'',
            clubBody:'',
            nickname:'',
            current_nickname:''
        }
        this.nickCheck=this.nickCheck.bind(this);
        this.moveHref= this.moveHref.bind(this);
        this.delete= this.delete.bind(this);
    }

    componentWillMount(){
        
        console.log("현재 로그인되어있는 닉네임: ", this.state.current_nickname);
       
        const post ={
            postNum: Number(window.location.href.slice(window.location.href.indexOf('?') + 1))
        }

        this.setState({
            current_nickname:JSON.parse(localStorage.getItem('user')).nickname,
            postNum:post.postNum
        });

        fetch('http://localhost:3001/api/getclubpost',{
          method: "post",
          headers : {
              'content-type':'application/json'
          },
          body:JSON.stringify(post)
        })
        .then(res => res.json())
        .then(json =>{
            console.log("게시글 내용 : ", json[0]);
            this.setState({
                nickname:json[0].card_nickname,
                clubTitle:json[0].card_title,
                clubShowbody:json[0].card_showbody,
                clubBody:json[0].card_body
            })
        })
    }

    nickCheck(){
       
       if(this.state.card_nickname===this.state.card_nickname){
            console.log("현재 닉네임과 게시글 작성자 일치")
            return true;
        }else
            return false;
    }

    moveHref(){ /*카드 누르면 게시물 내용 보는 페이지로 들어가짐*/
        document.location.href='/7?'+this.state.postNum; 
    }


    
    delete(){
        
        if(window.confirm("이 홍보글을 지우시겠습니까?")){ 

            const post={
                card_UN:2,
                postNum:this.state.postNum
            }
            fetch('http://localhost:3001/api/deletecardpost',{
                method: "post",
                headers : {
                    'content-type':'application/json'
                },
                body:JSON.stringify(post)
            })
            .then(res => res.json())
            .then(json =>{
                console.log("게시글 내용 : ", json[0]);
                this.setState({
                    postNum:0,
                    clubTitle:'',
                    clubShowbody:'',
                    clubBody:'',
                    nickname:'',
                    current_nickname:''
                })
            }).then(document.location.href="/club")
        }
        
    }
            
    render(){
        
        return(
            <div>
            
                <div className="dongali_title">
                    <p>{this.state.clubTitle}</p>
                </div>

                

                <div className="dongali_picture">
                    <img src={Img} width="800px"/>
                </div>
                <div className="user_nickname">
                    <div className="user_img">
                        <img src={Userimg} />
                    </div>
                    <div className="user_name_part">
                        <p>{this.state.nickname}</p>
                    </div>
                </div>
                <div className="dongali_body2">
                    <div className="dongali_body_text">
                    <span>{this.state.clubBody}</span>
                    </div>
                </div>

                {this.nickCheck()&&<Button className="clubcardmodify"  variant="contained" ariant="outlined" onClick={this.moveHref}>수정</Button>}
                {this.nickCheck()&&<Button className="clubcarddelete" ariant="outlined" variant="contained" color="secondary" onClick={this.delete}>삭제</Button>}

                <div className="comment_div">
                    <div className="comment_title">
                        <p>
                        댓글 창
                        </p>
                       
                    </div>

                    <div className="recomment_input"><label>댓글 쓰기</label><input type="text" placeholder="댓글을 입력하세요"/></div>
                </div>
            </div>
        )
    }
}

export default Dongali;