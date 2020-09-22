import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "./meeting_board_body.css";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import MeetingApply from "./meeting_apply";
import Pagination from "@material-ui/lab/Pagination";

class Meeting_board_body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meeting_row: [],
      meeting_row2: [],
      dt: new Date(),
      rowsPerPage: 8,
      rows_count: 0,
      curpage: 1,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    console.log("반응1");
    const post = {
      curpage: this.state.curpage,
      rowsPerPage: this.state.rowsPerPage,
    };
    fetch("api/meeting_rowscount", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ rows_count: res[0].rows_count });
      });
    fetch("api/meeting_writes", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("된당");
        this.setState({
          meeting_row: json,
        });
      });
  }
  handleChange(e, page) {
    console.log("반응2");
    this.setState({
      curpage: page,
    });
    const post = {
      curpage: page,
      rowsPerPage: this.state.rowsPerPage,
    };
    fetch("api/meeting_writes", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          meeting_row: json,
        });
      });
  }

  render() {
    const { meeting_row } = this.state;
    const { handleChange } = this;
    const count = Math.ceil(this.state.rows_count / this.state.rowsPerPage);

    return (
      <div className="grids">
        <Grid container spacing={1}>
          {meeting_row.map((row, index) => (
            <ul key={index} className="list_ul">
              <Grid item xs={12}>
                <div className="bmbm2">
                  <div className="meeting_date">{row.time_diff}</div>
                  <Chip
                    variant="outlined"
                    size="small"
                    label={row.group_sex}
                    color="primary"
                  />
                  <Chip
                    variant="outlined"
                    size="small"
                    label={row.group_size}
                    color="primary"
                  />
                  <Chip
                    variant="default"
                    size="small"
                    label={row.deadline}
                    color="primary"
                  />

                  <div className="title1">
                    <Typography>{row.group_body}</Typography>
                  </div>
                  <div className="apply1">
                    <MeetingApply />
                  </div>
                </div>
              </Grid>
            </ul>
          ))}
        </Grid>
        <div className="page">
          <Pagination
            count={count}
            color="primary"
            onChange={handleChange}
          ></Pagination>
        </div>
      </div>
    );
  }
}

export default Meeting_board_body;
