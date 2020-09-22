import React from "react";
import "./gridmarket.css";
import ClubCard from "../dongalicard/clubcard";
import Pagination from "@material-ui/lab/Pagination";

class Griddongali extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startPostNum: 0,
      rows: "",
      pagecount: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.getMaxPostNumGuide = this.getMaxPostNumGuide.bind(this);
    this.getSixPost = this.getSixPost.bind(this);
    this.isFull = this.isFull.bind(this);
    this.goTop = this.goTop.bind(this);
  }

  componentWillMount() {
    /*첫 페이지 보여주기 위해서*/
    this.getMaxPostNumGuide();
    this.getSixPost(this.state.startPostNum);
  }

  getMaxPostNumGuide() {
    /*게시물 가이드 숫자 정하기*/
    fetch("api/totalpostnumclub", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("가져온 카드개수: ", json[0].count);
        this.setState({
          pagecount: Math.ceil(json[0].count / 6),
        });
        console.log("set한 카드개수: ", this.state.pagecount);
      });
  }

  getSixPost(page) {
    const post = {
      startPostNum: page,
    };

    fetch("api/getsixpostclubtable", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("가져온 rows: ", json);
        this.setState({
          rows: json,
        });
        console.log("set rows: ", this.state.rows);
      });
  }

  isFull(str) {
    if (typeof str === "undefined" || str == null || str === "") return false;
    else return true;
  }

  handleChange = (event, value) => {
    console.log("page 번호 value :", value);
    const page = (value - 1) * 6;
    console.log("page연산결과:", page);
    this.getSixPost(page);
  };

  goTop() {
    document.documentElement.scrollTop = 130;
  }

  render() {
    return (
      <div>
        <div className="gridmarket_main">
          {this.isFull(this.state.rows[0]) && (
            <div className="gridmarket_1">
              <ClubCard post={this.state.rows[0]} />
            </div>
          )}
          {this.isFull(this.state.rows[1]) && (
            <div className="gridmarket_2">
              <ClubCard post={this.state.rows[1]} />
            </div>
          )}
          {this.isFull(this.state.rows[2]) && (
            <div className="gridmarket_3">
              <ClubCard post={this.state.rows[2]} />
            </div>
          )}
          {this.isFull(this.state.rows[3]) && (
            <div className="gridmarket_4">
              <ClubCard post={this.state.rows[3]} />
            </div>
          )}
          {this.isFull(this.state.rows[4]) && (
            <div className="gridmarket_5">
              <ClubCard post={this.state.rows[4]} />
            </div>
          )}
          {this.isFull(this.state.rows[5]) && (
            <div className="gridmarket_6">
              <ClubCard post={this.state.rows[5]} />
            </div>
          )}
        </div>

        <div className="postpagecount">
          {" "}
          {/*cdcd에서 postpagecount로 바꿈*/}
          <Pagination
            count={this.state.pagecount}
            color="primary"
            onChange={this.handleChange}
            onClick={this.goTop}
            size="large"
          />
          {/*게시판 번호 선택하는 부분 */}
        </div>
      </div>
    );
  }
}

export default Griddongali;
