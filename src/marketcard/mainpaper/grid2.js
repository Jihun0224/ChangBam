import React from "react";
import { Grid, Typography } from "@material-ui/core";
import "./grid.css";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import StarIcon from "@material-ui/icons/Star";
import { yellow } from "@material-ui/core/colors";

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

class Centergrid2 extends React.Component {
  render() {
    const posts = [
      {
        id: 1,
        title: "오늘의인기글",
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
                    <Typography align="left" variant="h5">
                      <a href="/">
                        <li>오늘 너무 기쁘다 ㅎㅎ[32]</li>
                      </a>

                      <a href="/">
                        <li>우리는 하나다 고로 존재한다.][5]</li>
                      </a>

                      <a href="/">
                        <li>오늘 인강듣다가 정휘제 똥쌈 ㅋㅋ[2]</li>
                      </a>

                      <a href="/">
                        <li>그시절의 우리 웃고울었던[4]</li>
                      </a>

                      <a href="/">
                        <li>오늘 불꽃집회 안하노...[1]</li>
                      </a>

                      <a href="/">
                        <li>여기 사이트 망함? ㄹㅇㅋㅋ[5]</li>
                      </a>

                      <a href="/">
                        <li>송용민 오빠 너무 멋있어요[2]</li>
                      </a>
                    </Typography>
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

export default Centergrid2;
