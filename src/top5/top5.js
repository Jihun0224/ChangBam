import React, { Component } from "react";
import "./top.css";

class Top extends Component {
  render() {
    return (
      <div className="topbox">
        <div className="toptitle">
          <p>커뮤니티</p>
          <p>top5</p>
        </div>
        <div className="toptext">
          <ol>
            <a href="/">
              <li>
                [*******게시판][내용~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~][댓글수]
              </li>
            </a>
            <a href="/">
              <li>
                [*******게시판][내용~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~][댓글수]
              </li>
            </a>
            <a href="/">
              <li>
                [*******게시판][내용~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~][댓글수]
              </li>
            </a>
            <a href="/">
              <li>
                [*******게시판][내용~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~][댓글수]
              </li>
            </a>
            <a href="/">
              <li>
                [*******게시판][내용~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~][댓글수]
              </li>
            </a>
          </ol>
        </div>
      </div>
    );
  }
}

export default Top;
