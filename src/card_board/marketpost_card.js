import React from 'react';
import './cardpost_card.css';
import GoodsImage from './GoodsImage.jpg'
import { Link } from "react-router-dom";

class MarketCard extends React.Component {
    constructor(props){
        super(props);
        this.state={
            clubTitle:'',
            clubSubtitle:'',
            clubShowbody:''
        }
    }

    render() {
        return (
            <div class="cardpost_card">
            <figure class="effect-dexter">
                <img src={GoodsImage} alt="img01" width={250} height={320}/>
                <figcaption>
                    <h3><font>(판매중)</font> <br/>상품명</h3>
                    <p>위치<br/>가격</p>
                    <Link to={`/changbamMarket/view/id=0&card=1`}/>
                </figcaption>
            </figure>
        
            
        </div>

        )
    };

}

export default MarketCard;