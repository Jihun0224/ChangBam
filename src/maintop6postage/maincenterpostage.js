import React from "react";
import { Grid, Typography } from "@material-ui/core";
import "./maincenterpostage.css";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import { Link } from "react-router-dom";
import popularity from "./popularity.png";
import anonymousboard from "./anonymousboard.png";
import employment from "./employment.png";
import market from "./market.png";
import freeboard from "./freeboard.png";
import promotion from "./promotion.png";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: 400,
    paddingRight: 400,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "auto",
    width: "auto",
  },
}));


class MainTopPostage extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
      TodayTop6:[],
      FreeTop6: [],
      AnonymousTop6:[],
      EmploymentTop6: [],
    };
  }

  componentWillMount(){

    fetch("http://localhost:3001/api/TodayTop6Postage", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((res) => {
      this.setState({ TodayTop6: res});
    });

    fetch("http://localhost:3001/api/FreeTop6Postage", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((res) => {
      this.setState({ FreeTop6: res});
    });
    fetch("http://localhost:3001/api/AnonymousTop6Postage", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((res) => {
      this.setState({ AnonymousTop6: res});
    });
    fetch("http://localhost:3001/api/EmploymentTop6Postage", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((res) => {
      this.setState({ EmploymentTop6: res});
    });
    
  }
  render() {
    const posts = [
      {
        id: 1,
        title: "오늘의 인기글",
        url:"/",
        png:popularity,
      },
      {
        id: 2,
        title: "자유게시판",
        url:"/free/list/board=0",
        png:freeboard,
      },
      {
        id: 3,
        title: "익명게시판",
        url:"/anonymous/list/board=1",
        png:anonymousboard,
      },
      {
        id: 4,
        title: "취업게시판",
        url:"/EmploymentReview/list/board=9",
        png:employment,
      },
      {
        id: 5,
        title: "창밤 마켓",
        url:"/",
        png:market,
      },
      {
        id: 6,
        title: "자유홍보",
        url:"/",
        png:promotion,
      },
    ];
    
    return (
      <div className={useStyles.root}>
        <Grid container spacing={3} justify="center">
          {posts.map((post) => (
            <Grid key={post.id}>
              <div className="maincenterpostage">
                <Card className="maincentercard">
                  <CardHeader
                    title={
                      <Typography align="left" variant="h4">
                  <img className= "post_image"alt="" src={post.png} width="40px" height="40px"/><font className ="posttitle">{post.title}</font>
                      </Typography>
                    }
                    action={
                      <IconButton  focusRipple="false" 
                      component={Link}
                      to={`${post.url}`} align="left" >
                        <AddIcon/>
                      </IconButton>
                    }
                  ></CardHeader>
                  <hr />
                  <div className="maincentercardgrid">
                 
                  {post.id === 1 && this.state.TodayTop6.map((TodayTop =>(
                      <Typography 
                      component={Link}
                      to={`/${TodayTop.board_name}/view/id=${TodayTop.postage_key}&board=${TodayTop.postage_UN}`} align="left" 
                      >
                      <li>
                        <font className="MainPostageTitle"size = "3px">
                        {TodayTop.postage_title}
                        </font>
                        &nbsp;&nbsp;
                        <font color="#006cb7">
                        [{TodayTop.postage_comment}]
                        </font>
                      </li>
                      </Typography> 
                    )
                   ))}
                  {post.id === 2 && this.state.FreeTop6.map((FreeTop =>(
                      <Typography 
                      component={Link}
                      to={`/free/view/id=${FreeTop.postage_key}&board=0`} align="left" 
                      >
                      <li>
                        <font className="MainPostageTitle"size = "3px">
                        {FreeTop.postage_title}
                        </font>
                        &nbsp;&nbsp;
                        <font color="#006cb7">
                        [{FreeTop.postage_comment}]
                        </font>
                      </li>
                      </Typography> 
                    )
                   ))}
                    {post.id === 3 && this.state.AnonymousTop6.map((AnonymousTop =>(
                      <Typography 
                      component={Link}
                      to={`/anonymous/view/id=${AnonymousTop.postage_key}&board=1`} align="left" 
                      >
                      <li>
                        <font className="MainPostageTitle"size = "3px">
                        {AnonymousTop.postage_title}
                        </font>
                        &nbsp;&nbsp;
                        <font color="#006cb7">
                        [{AnonymousTop.postage_comment}]
                        </font>
                      </li>
                      </Typography> 
                    )
                   ))}
                   {post.id === 4 && this.state.EmploymentTop6.map((EmploymentTop =>(
                      <Typography 
                      component={Link}
                      to={`/EmploymentReview/view/id=${EmploymentTop.postage_key}&board=9`} align="left" 
                      >
                      <li>
                        <font className="MainPostageTitle"size = "3px">
                        {EmploymentTop.postage_title}
                        </font>
                        &nbsp;&nbsp;
                        <font color="#006cb7">
                        [{EmploymentTop.postage_comment}]
                        </font>
                      </li>
                      </Typography> 
                    )
                   ))}

                  </div>
                </Card>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default MainTopPostage;
