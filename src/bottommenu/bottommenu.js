import React, { Component } from "react";
import "./bottommenu.css";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";

class BottomMenu extends Component {

  render() {
    return (
        <Paper className= "BottomMenu" elevation={0}>
          <div className="BottomMenu_box">
          <Paper className="BottomMenu_community" elevation={0}>
            <font className="BottomMenu_title">커뮤니티</font>
            <ul>
              <li onClick={()=>window.location.reload()}><Link to={`/free/list/board=0`}><font className="BottomMenu_content">자유게시판</font></Link></li>
              <li onClick={()=>window.location.reload()}><Link to={`/anonymous/list/board=1`}><font className="BottomMenu_content">익명게시판</font></Link></li>
              <li onClick={()=>window.location.reload()}><Link to={`/new/list/board=2`}><font className="BottomMenu_content">새내기게시판</font></Link></li>
              <li onClick={()=>window.location.reload()}><Link to={`/old/list/board=8`}><font className="BottomMenu_content">졸업생게시판</font></Link></li>
              <li onClick={()=>window.location.reload()}><Link to={`/love/list/board=3`}><font className="BottomMenu_content">연애게시판</font></Link></li>
              <li onClick={()=>window.location.reload()}><Link to={`/politic/list/board=4`}><font className="BottomMenu_content">정치게시판</font></Link></li>
            </ul>
          </Paper>
          <Paper className="BottomMenu_campus" el     evation={0}>
            <font className="BottomMenu_title">캠퍼스</font>
            <ul>
              <li onClick={()=>window.location.reload()}><Link to={`/study/list/board=7`}><font className="BottomMenu_content">스터디그룹</font></Link></li>
              <li onClick={()=>window.location.reload()}><Link to={`/club/list/card=0`}><font className="BottomMenu_content">동아리홍보</font></Link></li>
              <li onClick={()=>window.location.reload()}><Link to="/meeting"><font className="BottomMenu_content">과팅</font></Link></li>
            </ul>
          </Paper>
          <Paper className="BottomMenu_imformation" elevation={0}>
            <font className="BottomMenu_title">생활정보</font>
            <ul>
              <li onClick={()=>window.location.reload()}><Link to={`/ChangbamMarket/list/card=1`}><font className="BottomMenu_content">창밤인 마켓</font></Link></li>
              <li onClick={()=>window.location.reload()}><Link to={`/RoomMarket/list/card=2`}><font className="BottomMenu_content">자취방 마켓</font></Link></li>
              <li onClick={()=>window.location.reload()}><Link to="alba"><font className="BottomMenu_content">알바창국</font></Link></li>
            </ul>
          </Paper>
          <Paper className="BottomMenu_employment" elevation={0}>
            <font className="BottomMenu_title">취업</font>
            <ul>
              <li onClick={()=>window.location.reload()}><Link to={`/EmploymentAnnouncement/list/board=10`}><font className="BottomMenu_content">채용공고</font></Link></li>
              <li onClick={()=>window.location.reload()}><Link to={`/EmploymentReview/list/board=9`}><font className="BottomMenu_content">취업게시판</font></Link></li>
            </ul>
          </Paper>
          <Paper className="BottomMenu_notice" elevation={0}>
            <font className="BottomMenu_title">공지사항</font>
            <ul>
              <li onClick={()=>window.location.reload()}><Link to={`/night/list/board=5`}><font className="BottomMenu_content">창밤 공지사항</font></Link></li>
              <li onClick={()=>window.location.reload()}><Link to={`/changwon/list/board=6`}><font className="BottomMenu_content">학교 공지사항</font></Link></li>
            </ul>
          </Paper>
          <Paper className="BottomMenu_help" elevation={0}>
            <font className="BottomMenu_title">고객지원</font>
            <ul>
              <li ><font className="BottomMenu_content">만든이</font></li>
              <li ><font className="BottomMenu_content">이용약관</font></li>
              <li ><font className="BottomMenu_content">개인정보 취급방침</font></li>
            </ul>
          </Paper>
          </div>
          <div className="copyright">
          <font className="copyright_font">Copyright © 창원대의 밤. All right Reserved.</font>
          </div>
        </Paper>
    );
  }
}

export default BottomMenu;
