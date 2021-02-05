import React from "react";
import { Grid, Typography } from "@material-ui/core";
import "./maincenterpostage.css";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import StarIcon from "@material-ui/icons/Star";
import { yellow } from "@material-ui/core/colors";
import { Link } from "react-router-dom";

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
      CommunityTop6: [],
      EmploymentTop6:[],
      NoticeTop6:[],

    };
  }

  componentWillMount(){

    fetch("http://localhost:3001/api/MainPostNoticeRows", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((res) => {
      this.setState({ NoticeTop6: res});
    });

    fetch("http://localhost:3001/api/MainPostCommunityRows", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((res) => {
      this.setState({ CommunityTop6: res});
    });

    fetch("http://localhost:3001/api/MainPostEmploymentRows", {
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
        title: "오늘의인기글",
        Toppostages:this.CommunityTop6,
      },
      {
        id: 2,
        title: "공지사항",
      },
      {
        id: 3,
        title: "캠퍼스",
      },
      {
        id: 4,
        title: "취업",
      },
      {
        id: 5,
        title: "생활정보",
      },
      {
        id: 6,
        title: "커뮤니티",
      },
    ];
    
    return (
      <div className={useStyles.root}>
        <Grid container spacing={3} justify="center">
          {posts.map((post) => (
            <Grid key={post.id}>
              <div className="card_main">
                <Card className="card">
                  <CardHeader
                    title={
                      <Typography align="left" variant="h4">
                        {post.title}
                      </Typography>
                    }
                    action={
                      <IconButton aria-label="star">
                        <StarIcon
                          style={{ color: yellow[500] }}
                          fontSize="small"
                        />
                      </IconButton>
                    }
                  ></CardHeader>
                  <hr />
                  <div className="box2">

                  {post.id === 2 && this.state.NoticeTop6.map((NoticeTop =>(
                      <Typography 
                      component={Link}
                      to={`/${NoticeTop.board_name}/view/id=${NoticeTop.postage_key}&board=${NoticeTop.postage_UN}`} align="left" 
                      >
                      <li>
                        <font className="MainPostageTitle"size = "3px">
                        {NoticeTop.postage_title}
                        </font>
                        &nbsp;&nbsp;
                        <font color="#006cb7">
                        [{NoticeTop.postage_comment}]
                        </font>
                      </li>
                      </Typography> 
                    )
                   ))}
                  {post.id === 4 && this.state.EmploymentTop6.map((EmploymentTop =>(
                      <Typography 
                      component={Link}
                      to={`/${EmploymentTop.board_name}/view/id=${EmploymentTop.postage_key}&board=${EmploymentTop.postage_UN}`} align="left" 
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

                    {post.id === 6 && this.state.CommunityTop6.map((CommunityTop =>(
                      <Typography 
                      component={Link}
                      to={`/${CommunityTop.board_name}/view/id=${CommunityTop.postage_key}&board=${CommunityTop.postage_UN}`} align="left" 
                      >
                      <li className="MainPostageTitle">
                      
                        <font  size = "3px">
                        {CommunityTop.postage_title}
                        </font>
                        &nbsp;&nbsp;
                        <font color="#006cb7">
                        [{CommunityTop.postage_comment}]
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
