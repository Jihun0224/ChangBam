import React from 'react';
import './cardpost_card.css';
import TestImage from './TestImage.jpg'
import { Link } from "react-router-dom";

class ClubCard extends React.Component {
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
    };

}

export default ClubCard;