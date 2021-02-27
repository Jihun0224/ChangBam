import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';



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
        this.props.history.push('/card=0');
    }
    render() {
        return (
            <div>
                {/*동아리카드*/}
                <Card className="clubcard" onClick={() => this.moveHref(this.props.post.card_key)}>
                      <img src={""} className="clubimageArea" /> {/*이미지 보여주는 부분 */}
                        <CardHeader
                            id="header"
                            title={this.props.post.card_title}
                            subheader={this.props.post.card_subtitle}
                        />
                      
                        
                        <Typography className = "marcketingMent" variant="body2" color="textSecondary" component="p" style={{whiteSpace: 'pre-line'}} >
                        {this.props.post.card_showbody}
                        </Typography>
                
                </Card>
            </div>

        )
    };

}

export default ClubCard;