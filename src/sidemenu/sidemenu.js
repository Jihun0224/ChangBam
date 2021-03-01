import React from "react";
import "./sidemenu.css";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function Sidemenu() {
  const classes = useStyles();
  const [open1, setOpen1] = React.useState(true);

  const handleClick1 = () => {
    setOpen1(!open1);

  };

  return (
    <div className="sidemenubar">
      <List
        component="nav"
        aria-label="main mailbox folders"
        className="nested"
      >
        <ListItem button onClick={handleClick1}>
          <ListItemText primary="바로가기" />
          {open1 ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding className="_body">
            <ListItem button>
              <ListItemText primary="커뮤니티" />
            </ListItem>
            <Button className="nested_btn" href="/free/list/board=0">
              자유게시판
            </Button>
            <Button className="nested_btn" href="/anonymous/list/board=1">
              익명게시판
            </Button>
            <Button className="nested_btn" href="/new/list/board=2">
              새내기게시판
            </Button>
            <Button className="nested_btn" href="/old/list/board=8">
              졸업생게시판
            </Button>
            <Button className="nested_btn" href="/love/list/board=3">
              연애게시판
            </Button>
            <Button className="nested_btn" href="/politic/list/board=4">
              정치게시판
            </Button>

            <Divider />
            <ListItem button>
              <ListItemText primary="캠퍼스" />
            </ListItem>
            <Button className="nested_btn" href="/study/list/board=7">
              스터디그룹
            </Button>
            <Button className="nested_btn" href="/club/list/card=0">
              동아리홍보
            </Button>
            <Button className="nested_btn" href="/meeting">
              과팅
            </Button>

            <Divider />

            <ListItem button>
              <ListItemText primary="생활정보" />
            </ListItem>
            <Button className="nested_btn" href="/changbamMarket/list/card=1">
              창밤인 마켓
            </Button>
            <Button className="nested_btn" href="/roomMarket/list/card=2">
              자취방 마켓
            </Button>
            <Button className="nested_btn" href="/alba/list/board=11">
              알바창국
            </Button>
            <Divider />

            <ListItem button>
              <ListItemText primary="취업" />
            </ListItem>
            <Button className="nested_btn" href="/EmploymentAnnouncement/list/board=10">
              채용공고
            </Button>
            <Button className="nested_btn" href="/EmploymentReview/list/board=9">
              취업게시판
            </Button>
            <Divider />

            <ListItem button>
              <ListItemText primary="공지사항" className="nested_title" />
            </ListItem>

            <Button className="nested_btn" href="/night/list/board=5">
              공지사항
            </Button>
            <Button className="nested_btn" href="/changwon/list/board=6">
              학교 공지사항
            </Button>
            <Button className="nested_btn" href="/">
              학과바로가기
            </Button>
          </List>
        </Collapse>
      </List>

    </div>
  );
}
