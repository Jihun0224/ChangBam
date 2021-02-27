import React, { Component } from 'react';
import './card_postbody.css';
import ClubCard from './clubpost_card';
import RoomCard from './roompost_card';
import MarketCard from './marketpost_card';
import Pagination from '@material-ui/lab/Pagination';

class CardPostBody extends Component{

    constructor(props){
        super(props);
        this.state={
            startPostNum:0,
            rows:'',
            pagecount:0,
            card_UN: this.props.card_UN,
        }
        this.handleChange= this.handleChange.bind(this);
        this.getMaxPostNumGuide =this.getMaxPostNumGuide.bind(this);
        this.getSixPost = this.getSixPost.bind(this);
        this.isFull = this.isFull.bind(this);
    }


    componentWillMount(){ /*첫 페이지 보여주기 위해서*/
        this.getMaxPostNumGuide();
        this.getSixPost(this.state.startPostNum);
    }

    getMaxPostNumGuide(){ /*게시물 가이드 숫자 정하기*/
        const post={
            card_UN:0  //동아리
        }
        fetch('http://localhost:3001/api/totalpostnum',{
          method: "post",
          headers: {
              'content-type':'application/json'
          },
          body:JSON.stringify(post)
        })
        .then(res => res.json())
        .then(json =>{
            console.log("가져온 카드개수: ",json[0].count);
            this.setState({
                pagecount:Math.ceil(json[0].count/6)
            });
            console.log("set한 카드개수: ",this.state.pagecount);
        })
    }

    getSixPost(page){
        const post ={
            startPostNum:page
        }

        fetch('http://localhost:3001/api/getsixpostclubtable',{
          method: "post",
          headers: {
              'content-type':'application/json'
          },
          body:JSON.stringify(post)
        })
        .then(res => res.json())
        .then(json =>{
            console.log("가져온 rows: ",json);
            this.setState({
                rows:json
            });
            console.log("set rows: ",this.state.rows);
        })
    }

    isFull(str){
         
        if(typeof str == "undefined" || str == null || str == "")
            return false;
        else
            return true;
    }

    handleChange = (event, value) => {
        console.log("page 번호 value :",value );
        const page=(value-1)*6;
        console.log("page연산결과:",page );
        this.getSixPost(page);
        document.documentElement.scrollTop = 130;
    };


    render(){

        return(
            <div className="card_post">
                <div className="card_postbody">
                    {this.state.card_UN == 0 &&
                    <>
                    {this.isFull(this.state.rows[0])&&(<div className="card_grid1" ><ClubCard post={this.state.rows[0]} /></div>)}
                    {this.isFull(this.state.rows[1])&&(<div className="card_grid2" ><ClubCard post={this.state.rows[1]}  /></div>)}
                    {this.isFull(this.state.rows[2])&&(<div className="card_grid3"><ClubCard post={this.state.rows[2]} /></div>)}
                    {this.isFull(this.state.rows[3])&&(<div className="card_grid4" ><ClubCard  post={this.state.rows[3]}/></div>)}
                    {this.isFull(this.state.rows[4])&&(<div className="card_grid5"><ClubCard post={this.state.rows[4]}/></div>)}
                    {this.isFull(this.state.rows[5])&&(<div className="card_grid6"><ClubCard  post={this.state.rows[5]} /></div>)}
                   </>
                   }
                   {this.state.card_UN == 1 &&
                    <>
                    {this.isFull(this.state.rows[0])&&(<div className="card_grid1" ><MarketCard post={this.state.rows[0]} /></div>)}
                    {this.isFull(this.state.rows[1])&&(<div className="card_grid2" ><MarketCard post={this.state.rows[1]}  /></div>)}
                    {this.isFull(this.state.rows[2])&&(<div className="card_grid3"><MarketCard post={this.state.rows[2]} /></div>)}
                    {this.isFull(this.state.rows[3])&&(<div className="card_grid4" ><MarketCard  post={this.state.rows[3]}/></div>)}
                    {this.isFull(this.state.rows[4])&&(<div className="card_grid5"><MarketCard post={this.state.rows[4]}/></div>)}
                    {this.isFull(this.state.rows[5])&&(<div className="card_grid6"><MarketCard  post={this.state.rows[5]} /></div>)}
                   </>
                   } 
                   {this.state.card_UN == 2 &&
                    <>
                    {this.isFull(this.state.rows[0])&&(<div className="card_grid1" ><RoomCard post={this.state.rows[0]} /></div>)}
                    {this.isFull(this.state.rows[1])&&(<div className="card_grid2" ><RoomCard post={this.state.rows[1]}  /></div>)}
                    {this.isFull(this.state.rows[2])&&(<div className="card_grid3"><RoomCard post={this.state.rows[2]} /></div>)}
                    {this.isFull(this.state.rows[3])&&(<div className="card_grid4" ><RoomCard  post={this.state.rows[3]}/></div>)}
                    {this.isFull(this.state.rows[4])&&(<div className="card_grid5"><RoomCard post={this.state.rows[4]}/></div>)}
                    {this.isFull(this.state.rows[5])&&(<div className="card_grid6"><RoomCard  post={this.state.rows[5]} /></div>)}
                   </>
                   } 
               </div>
                {
                    this.state.pagecount == 0 
                    ? <></>  
                    : <div className="card_postpagecount" >  
                        <Pagination
                        count={this.state.pagecount} 
                        color="primary"
                        onChange={this.handleChange}
                        size="large"/>
                    </div>}
               
            </div>
        )
    }
}

export default CardPostBody;