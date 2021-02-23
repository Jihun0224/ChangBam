import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import CommuityMenu from "./CommuityMenu";
import CampusMenu from "./CampusMenu";
import NoticeMenu from "./NoticeMenu";
import ImformationMenu from "./ImformationMenu";
import EmploymentMenu from "./EmploymentMenu";
import "./appbar.css";
import Switchbar from "../icon/switchbar";
import jQuery from "jquery";
import Realtitle from "./realtitle.png";
import { Link } from "react-router-dom";

class TopAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checklogin: false,
      open: false,
      auth: false,
    };
  }

  componentWillMount() {
    window.$ = window.jQuery = jQuery;
    window.$(window).scroll(function () {
      window.$(".header").css({ left: 0 - window.$(this).scrollLeft() });
    });
    const user = localStorage.getItem("admin");
    if (user === "true") {
      this.setState({
        checklogin: true,
        auth: true,
      });
    } else {
      this.setState({
        checklogin: false,
        auth: false,
      });
    }
  }
  render() {
    return (
      <div className="app_main">
        <AppBar position="fixed" className="header">
          <Toolbar variant="regular">
            <Link to="/">
              <img alt="" src={Realtitle} width="200px" height="40px" />
            </Link>

            <CommuityMenu />
            <CampusMenu />
            <ImformationMenu />
            <EmploymentMenu />
            <NoticeMenu />

            <span className="switchbar">
              <MenuItem>
                <Switchbar
                  checklogin={this.state.checklogin}
                  open={this.state.open}
                  auth={this.state.auth}
                />
              </MenuItem>
            </span>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default TopAppBar;
