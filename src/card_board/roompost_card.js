import React from 'react';
import './cardpost_card.css';
import RoomImage from './RoomImage.jpg'
import { Link } from "react-router-dom";

class RoomCard extends React.Component {
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
    };

}

export default RoomCard;