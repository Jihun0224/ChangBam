import React, { Component } from 'react';
import './marketmain';

class Recomment extends Component{
    render(){
        return(
            <div className="recomment_main">
                <div className="comments_body">
                    <a href="" onClick={this.handleclick}>어린콩</a>
                    <span id="comments_time">2020/10월/02일</span>
                    <input type="button" value={`신고`}/>
                    <div id="comments_text">
                        <pre>asdasdasdasd asdasd</pre>
                    </div>
                </div>
                <div>
                    <input type="text" /> 
                </div>
            </div>
        )
    }
}

export default Recomment;