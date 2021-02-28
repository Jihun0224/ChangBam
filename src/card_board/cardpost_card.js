import React from 'react';
import './cardpost_card.css';
import RoomImage from './TestImage/RoomImage.jpg'
import TestImage from './TestImage/TestImage.jpg'
import GoodsImage from './TestImage/GoodsImage.jpg'
import { Link } from "react-router-dom";

class CardPost_Card extends React.Component {

    render() {
        if(this.props.card_UN == 0){
            return (
                <div class="cardpost_card">
    
                <figure class="effect-ming">
                    <img src={TestImage} alt="img01" width={250} height={320}/>
                    <figcaption>
                        <h2>동아리명 </h2>
                            <span>카테고리</span>
                        <p>슬로건</p>
                        <Link to={`/club/view/id=0&card=0`}/>
                    </figcaption>			
                </figure>
            </div>
    
            )
        }
        else if(this.props.card_UN == 1){
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
        }
        else{
            return (
                <div class="cardpost_card">
                <figure class="effect-julia">
                    <img src={RoomImage} alt="img01" width={250} height={320}/>
                    <figcaption>
                        <h2>500/30/복층 </h2>
                        <div>
                        <p>위치</p><br/>
                        <p>옵션</p>
                        </div>
                        <Link to={`/roomMarket/view/id=0&card=2`}/>
                    </figcaption>			
                </figure>
            </div>
            )
        }

    };

}

export default CardPost_Card;