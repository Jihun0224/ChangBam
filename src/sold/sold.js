import React, { Component } from "react";
import "./sold.css";
import { Link } from "react-router-dom";

class Sold extends Component {
  render() {
    return (
      <Link to="/sold" className="link">
        <div className="body">
          <div className="picture">
            <img
              alt=""
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTen-YARwzRaqwWiCZY6-4w5x1PqY79eYDqCZgTRMCsutBGkuRl&usqp=CAU"
            />
          </div>
          <div className="where">
            <p>중앙동아리</p>
          </div>
          <div className="title">
            <p>영화제작 동아리 나 래</p>
          </div>
          <div className="time">
            <p>D-day : 49</p>
          </div>
          <div className="see">
            <p>조회수: 21회 댓글 1개</p>
          </div>
        </div>
      </Link>
    );
  }
}

export default Sold;
