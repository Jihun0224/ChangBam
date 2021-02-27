import React from 'react';
import Ramian from './ramian.jpg';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Love_button from '../../market/marketcard/love_button'


class RoomCard extends React.Component {

    constructor(props){
        super(props);
        this.state={
            sale_check:'판 매 중',
            likecount:0,
            mode:'', //구조
            option:{},
            price:'', //보증금/월세
            location:'',  //위치
            content:'',   //세부내용
            nickname:'',
            postNum:0
        }
        this.salecheck = this.salecheck.bind(this);
        this.moveHref = this.moveHref.bind(this);
        this.likechange = this.likechange.bind(this);
        this.likeset= this.likeset.bind(this);
    }   
    componentWillMount(){
        this.likeset();
        this.salecheck();
        this.optionset();
        this.setState({
            likecount: this.props.post.card_likes
        });
    }

    optionset=()=>{
        console.log(this.props.post);
        console.log(this.props.post.card_options);
        console.log(Object.keys(this.state.option).length);
        if(this.props.post.card_options!=null){
        this.setState({
            option:this.props.post.card_options.split(",")
        })}
    }

    salecheck(){
        console.log("sale_check:", this.state.sale_check);
        if(this.props.post.card_sale_check===1){
            this.setState({
                sale_check:'판 매 완 료'
            })
        }else{
            this.setState({
                sale_check:'판 매 중'
            })
        }
    }

    moveHref(card_key){ /*카드 누르면 게시물 내용 보는 페이지로 들어가짐*/
        document.location.href='/9?'+card_key; 
    }


    likeset(){
        
        const post = {
            card_key:this.props.post.card_key,
            nickname:this.props.nick   //현재로그인되어있는 사용자 닉네임
        }
        fetch('http://localhost:3001/api/likecheck',{
            method: "post",
            headers: {
                'content-type':'application/json'
            },
            body:JSON.stringify(post)
        }).then(res => res.json())
        .then(res =>{
            this.setState({
                like: res
            })
        })        
    }

    likechange(){

          if(this.state.like === true){
                this.setState({
                    like:false,
                    likecount:this.state.likecount-1});
            }else{
                this.setState({like:true,
                    likecount:this.state.likecount+1});
            }

            const post = {
                card_key:this.props.post.card_key,
                nickname:this.props.nick,
                like:this.state.like
            }
            fetch('http://localhost:3001/api/likechange',{
                method : "post",
                headers : {
                    'content-type':'application/json'
                },
                body:JSON.stringify(post)
            })
            
    }

    
    render() {
        let tag;
        if(Object.keys(this.state.option).length!==0)
            tag = this.state.option.map((tag) => <li >{tag}</li>);

        console.log(this.state.option);
        console.log(tag);
        return (
            <div>
    
                {/*중고마켓카드*/}
                <Card className="roomcardMain" onClick={() => this.moveHref(this.props.post.card_key)}>
                    
                    <img src={Ramian} className="marcketimageArea" />

                    <p className ="roomprice" >   
                            <font id="roomprice" >
                                {this.props.post.card_price} 
                                
                            </font>
                    </p>

                    <div id="roommodepack">
                        <p id="modeText">구조</p>
                
                        <p className ="roommode">   
                            <font id="mode">
                                {this.props.post.card_subtitle} {/*구조: 투룸, 분리형(방1거실1),오픈형(방1), 복층형 */}
                                <br></br>
                            </font>
                         </p>
                    </div>

                    <p className ="roomlocation"> {this.props.post.card_location} </p>
                   
                    <div class="tagcontainer">
                        {
                            this.state.option.map(tag =>
                                <p id="tagoption">{tag}</p>
                            )
                        }
                     </div>

                                        

                   

                </Card>

                <Paper className="bottompaper">
                        
                        <p className ="marketsale">   
                            <font color="black" >
                                {this.state.sale_check}
                            </font>
                        </p>

                        
                        <Love_button like={this.state.like} onClick={this.likechange} />
                    
                        <p className ="marketheartNum">   

                            
                                <font color="black" >
                                    {this.state.likecount}
                                </font>
                        </p>

                    </Paper>

            </div>

        )
    }
}



export default RoomCard;