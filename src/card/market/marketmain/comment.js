import React, { Component } from 'react';
import User from './username.png';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Recommentline from './commentline';
import './marketmain';
import Next2 from './next2.png';

class Comments extends Component{
    constructor(props){
        super(props);
        this.state = {
            anchorEl:null,
            recomment: "",
            input:"",
            click: false
        }
        this.handleclick = this.handleclick.bind(this);
        this.handleclick2 = this.handleclick2.bind(this);
        this.handleclose = this.handleclose.bind(this);
    }
    handleclick(event){
        event.preventDefault();
        this.setState({
            anchorEl:event.currentTarget
        })
        
    }
    handleclick2(){
        if(this.state.click===false){
            this.setState({
                recomment:<Recommentline/>,
                input:<div className="recomment_input"><img src={Next2} width="30px" height="30px"/><label>답글 쓰기</label><input type="text" placeholder="댓글을 입력하세요"/></div>,
                click:true
            })
        }else{
            this.setState({
                recomment:"",
                input:"",
                click:false
            })
        }
    }
    handleclose(){
        this.setState({
            anchorEl:null
        })
    }
    render(){
        return(
            <div className="comments_line">
                <img src={User} width="30px" height="30px"/>
                <div className="comments_body">
                    <a href="" onClick={this.handleclick}>어린콩</a>
                    <span id="comments_time">2020/10월/02일</span>
                    <input type="button" value={`답글 ${3}`} onClick={this.handleclick2}/>
                    <input type="button" value={`신고`}/>
                    <div id="comments_text">
                        <pre>asdasdasdasd asdasd</pre>
                    </div>
                </div>
                <div>
                    {this.state.recomment}
                    {this.state.recomment}
                    {this.state.recomment}
                    {this.state.input}
                </div>
                <div>
                 <Popover
                    className="comments_popover"
                    id={Boolean(this.state.anchorEl) ? 'simple-popover' : undefined}
                    open={Boolean(this.state.anchorEl)}
                    anchorEl={this.state.anchorEl}
                    onClose={this.handleclose}
                    anchorOrigin={{
                    vertical: 'right',
                    horizontal: 'right',
                    }}
                    transformOrigin={{
                    vertical: 4,
                    horizontal: -10
                    }}
                >
                    <a href="">메세지</a>
                    <hr/>
                    <a href="">프로필</a>
                </Popover>
            </div>
            </div>
            
        )
    }
}

export default Comments;