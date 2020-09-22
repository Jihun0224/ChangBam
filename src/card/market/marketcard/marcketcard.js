import React from "react";
import "./marcketcard.css";
import Ramian from "./ramian.jpg";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import LoveButton from "./love_button";

class MarcketCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      price: "",
      location: "",
      time: "",
      sale_check: "판 매 중",
      likecount: 0,
    };
    this.salecheck = this.salecheck.bind(this);
    this.moveHref = this.moveHref.bind(this);
    this.likechange = this.likechange.bind(this);
    this.likeset = this.likeset.bind(this);
  }
  componentWillMount() {
    this.likeset();
    this.salecheck();
    this.setState({
      likecount: this.props.post.card_likes,
    });
  }

  salecheck() {
    console.log("sale_check:", this.state.sale_check);
    if (this.props.post.card_sale_check === 1) {
      this.setState({
        sale_check: "판 매 완 료",
      });
    } else {
      this.setState({
        sale_check: "판 매 중",
      });
    }
  }

  moveHref(card_key) {
    /*카드 누르면 게시물 내용 보는 페이지로 들어가짐*/
    document.location.href = "/2?" + card_key;
  }

  likeset() {
    const post = {
      card_key: this.props.post.card_key,
      nickname: this.props.nick, //현재로그인되어있는 사용자 닉네임
    };
    fetch("api/likecheck", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          like: res,
        });
      });
  }

  likechange() {
    if (this.state.like === true) {
      this.setState({
        like: false,
        likecount: this.state.likecount - 1,
      });
    } else {
      this.setState({ like: true, likecount: this.state.likecount + 1 });
    }

    const post = {
      card_key: this.props.post.card_key,
      nickname: this.props.nick,
      like: this.state.like,
    };
    fetch("http://localhost:3001/likechange", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    });
  }

  render() {
    return (
      <div>
        {/*중고마켓카드*/}
        <Card
          className="marketcardMain"
          onClick={() => this.moveHref(this.props.post.card_key)}
        >
          <img alt="" src={Ramian} className="marcketimageArea" />

          <p className="marketproduct"> {this.props.post.card_title} </p>

          <p className="marketlocation"> {this.props.post.card_location} </p>

          <p className="markettime">
            <font id="markettime" color="gray">
              {this.props.post.card_date}
              <br></br>
            </font>
          </p>

          <p className="marketprice">
            <font id="marketprice" color="orange">
              {this.props.post.card_price} 원
            </font>
          </p>
        </Card>

        <Paper className="bottompaper">
          <p className="marketsale">
            <font color="black">{this.state.sale_check}</font>
          </p>

          <LoveButton like={this.state.like} onClick={this.likechange} />

          <p className="marketheartNum">
            <font color="black">{this.state.likecount}</font>
          </p>
        </Paper>
      </div>
    );
  }
}

export default MarcketCard;
