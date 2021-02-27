import React, { Component } from 'react';
import Left from './return.png';
import Right from './next.png';
import IconButton from '@material-ui/core/IconButton';
import Jgo from './jgo.jpg';
import Userimg from './username.png';
import Sold from './sold-out.png';
import Love from './lovelike.png';
import Button from '@material-ui/core/Button';

class Marketbody extends Component{
    constructor(props){
        super(props);
        this.state={
            productName:'',
            price:'',
            location:'',
            nickname:'',
            body:'',
            salecheck:0,
            redSoldCondition:'판 매 중',
            postNum:0
        }
        this.nickCheck= this.nickCheck.bind(this);
        this.modify= this.modify.bind(this);
        this.delete= this.delete.bind(this);
        this.soldout=this.soldout.bind(this);
    }

    componentWillMount(){

        const post ={
            postNum: Number(window.location.href.slice(window.location.href.indexOf('?') + 1))
        }

        this.setState({
            current_nickname:JSON.parse(localStorage.getItem('user')).nickname,
            postNum:post.postNum
        });

        fetch('http://localhost:3001/api/getmarketpost',{
          method: "post",
          headers : {
              'content-type':'application/json'
          },
          body:JSON.stringify(post)
        })
        .then(res => res.json())
        .then(json =>{
            this.setState({
                productName:json[0].card_title,
                price:Number(json[0].card_price),
                location:json[0].card_location,
                nickname:json[0].card_nickname,
                body:json[0].card_body,
                salecheck:Number(json[0].card_sale_check)
            })

            if(this.state.salecheck==1){
                this.setState({
                    redSoldCondition:"판 매 완 료"
                })
            }
        })
    }

    nickCheck(){
       
        if(this.state.card_nickname===this.state.card_nickname){
             console.log("현재 닉네임과 게시글 작성자 일치")
             return true;
         }else
             return false;
    }

    modify(){ /*카드 누르면 게시물 내용 보는 페이지로 들어가짐*/
        if(this.state.salecheck==0){
            document.location.href='/6/?'+this.state.postNum; 
        }else
            window.alert("판매완료된 상품의 게시물은 수정할 수 없습니다.");
    }
 
    delete(){
        
        if(window.confirm("이 상품 판매글을 지우시겠습니까?")){
            const post={
                card_UN:0,
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
                    productName:'',
                    price:'',
                    location:'',
                    nickname:'',
                    body:'',
                    salecheck:0,
                    postNum:0
                })
            }).then(document.location.href="/market")
        }
    }

    soldout(){
        if(this.state.salecheck==0){
            if(window.confirm("이 상품의 판매를 종료하시겠습니까?")){
                const post={
                    card_key:this.state.postNum
                }
                fetch('http://localhost:3001/api/soldoutcard',{
                method: "post",
                headers : {
                    'content-type':'application/json'
                },
                body:JSON.stringify(post)
                })
                .then(
                    this.setState({
                        salecheck:1,
                        redSoldCondition:"판 매 완 료"
                    })
                )
            }
        }else
            window.alert("이미 판매가 종료된 상품입니다.");
    }

 

    render(){
        return(
            <div className="marketbody">
                <div className="img_button1">
                    <IconButton>
                        <img src={Right} width="30px" height="30px"/>
                    </IconButton>
                </div>
                <div className="img_button2">
                    <IconButton>
                        <img src={Left} width="30px" height="30px"/>
                    </IconButton>
               
                </div>
                <div className="market_img">
                    <img src={Jgo} width="500px" height="400px"/>
                </div>
                <div className="user_nickname">
                    <div className="user_img">
                        <img src={Userimg} />
                    </div>
                    <div className="user_name_part">
                        <p>{this.state.nickname}</p>
                    </div>
                    <div className="soldout">
                        <p>{this.state.redSoldCondition}</p>
                    </div>
                </div>
                <div className="market_title">
                    <p>{this.state.productName}</p>
                    <p>{this.state.price}원</p>
                    <div className="market_body_text">
                        <span>
                            {this.state.body}
                        </span>
                    </div>
                    
                </div>
                
                <div className="love_this">
                    <span>찜하기</span>
                    <IconButton>
                    <img src={Love} />
                    </IconButton>
                </div>
                
                <div className="threeButton">
                    {this.nickCheck()&&<Button className="marketcardsale"  variant="contained" color="primary" onClick={this.soldout} >판매마감</Button>}

                    {this.nickCheck()&&<Button className="marketcardmodify"  variant="contained" ariant="outlined" onClick={this.modify} >수정</Button>}
                    {this.nickCheck()&&<Button className="marketcarddelete" ariant="outlined" variant="contained" color="secondary" onClick={this.delete}>삭제</Button>}

                </div>
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

export default Marketbody;