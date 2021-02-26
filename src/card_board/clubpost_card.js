import React from 'react';
import './clubpost_card.css';
import TestImage from './TestImage.jpg'

class ClubCard extends React.Component {
    constructor(props){
        super(props);
        this.state={
            clubTitle:'',
            clubSubtitle:'',
            clubShowbody:''
        }
    }

    moveHref(card_key){ /*카드 누르면 게시물 내용 보는 페이지로 들어가짐*/
        document.location.href='/club/view/id=2&card=0'; 
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
                    <a href="/club/view/id=2&card=0" width={250} height={320}/>
                </figcaption>			
            </figure>
        
            
        </div>

        )
    };

}

export default ClubCard;