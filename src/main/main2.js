import React, { Component } from 'react';
import './login.css'; 
import { Link } from 'react-router-dom';


class Adminbox extends Component{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(e){
        window.localStorage.setItem('id','');
        window.localStorage.setItem('admin',false);
        window.localStorage.setItem('nickname','');
    }
   

    render(){
        const {logout} = this;
        return(
            
            <div className="logbox">
                <div className="idpwbox">
                    <p>{window.localStorage.getItem('nickname')} 을 환영합니다!</p>
                    <ul id="sign">
                        <li>
                           <Link to='/admin'>개인정보</Link>
                        </li>
                        <li>
                            <Link to='/' onClick={logout}>로그아웃</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}


export default Adminbox;