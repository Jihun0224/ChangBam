import React from "react";
import "./marcketcard.css";
import Ramian from "./ramian.jpg";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import HeartIcon from "./heart.png";

class MarcketCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      price: "",
      location: "",
      time: "",
    };
    this.salecheck = this.salecheck.bind(this);
    this.moveHref = this.moveHref.bind(this);
  }

  salecheck() {
    alert(this.props.post.card_sale_check);
    if (this.props.post.card_sale_check === 1) {
      alert("card true");
      return true;
    } else {
      alert("card false");
      return false;
    }
  }

  moveHref(card_key) {
    /*카드 누르면 게시물 내용 보는 페이지로 들어가짐*/
    document.location.href = "/2?" + card_key;
  }

  incrementHeart() {
    if (this.state.love_state === true) {
      this.setState({ love_state: false });
    } else {
      this.setState({ love_state: true });
    }

    const post = {
      love_state: this.state.love_state,
      postage_key: this.props.match.params.postage_key,
      board_key: this.props.match.params.board_key,
    };
    fetch("api/like_adjustment", {
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
          9
          <p className="marketprice">
            <font id="marketprice" color="orange">
              {this.props.post.card_price} 원<br></br>
            </font>
          </p>
        </Card>

        <Paper className="bottompaper">
          {this.salecheck && (
            <p className="marketsale">
              <font color="black">판 매 중</font>
            </p>
          )}

          <img
            src={HeartIcon}
            className="marketheart"
            onClick={() => this.incrementHeart()}
            alt=""
          />

          <p className="marketheartNum">
            <font color="black">{this.props.post.card_likes}</font>
          </p>
        </Paper>
      </div>
    );
  }
}

export default MarcketCard;
