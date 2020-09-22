import React, { Component } from "react";
import "./post.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";
import { Link } from "react-router-dom";
class Postbody extends Component {
  editorRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      curpage: 1,
      rowsPerPage: 18,
      rows_count: 0,
      board_key: this.props.board_key,
      board_name: "",
    };
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  handleChangePage(e, page) {
    this.setState({
      curpage: page,
    });

    const post = {
      curpage: page,
      rowsPerPage: this.state.rowsPerPage,
      board_key: this.state.board_key,
    };

    fetch("api/get_rows", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ rows: res });
      });
  }
  componentWillMount() {
    const post = {
      curpage: 1,
      rowsPerPage: 18,
      board_key: this.state.board_key,
    };
    fetch("http://localhost:3001/api/rowscount", {
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
    fetch("http://localhost:3001/api/get_rows", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ rows: res });
      });

    switch (this.state.board_key) {
      case 0:
      case "0":
        this.setState({ board_name: "free" });
        break;
      case 1:
      case "1":
        this.setState({ board_name: "anonymous" });
        break;
      case 2:
      case "2":
        this.setState({ board_name: "new" });
        break;
      case 3:
      case "3":
        this.setState({ board_name: "love" });
        break;
      case 4:
      case "4":
        this.setState({ board_name: "politic" });
        break;
      case 5:
      case "5":
        this.setState({ board_name: "공지사항" });
        break;
      case 6:
      case "6":
        this.setState({ board_name: "학교공지사항" });
        break;
      // case "study":
      //     this.setState({board_key:7});
      //     break;
      default:
        this.setState({ board_name: "study" });
    }
  }

  render() {
    console.log(this.props.board_key);
    const { rows, rowsPerPage, rows_count } = this.state;
    const count = Math.ceil(rows_count / rowsPerPage);
    const { handleChangePage } = this;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length);
    return (
      <div>
        <div className="postbody">
          <TableContainer component={Paper}>
            <Table>
              <TableHead className="head_row">
                <TableRow>
                  <TableCell align="center" className="first">
                    번호
                  </TableCell>
                  <TableCell align="center" className="second">
                    제목
                  </TableCell>
                  <TableCell align="center" className="third">
                    이름
                  </TableCell>
                  <TableCell align="center" className="third">
                    좋아요
                  </TableCell>
                  <TableCell align="center" className="fourth">
                    날짜
                  </TableCell>
                  <TableCell align="center" className="third">
                    조회수
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody className="row_main">
                {rows.slice(0, rowsPerPage).map((row) => (
                  <TableRow key={row.postage_key}>
                    <TableCell component="th" scope="row" className="first">
                      {row.rownum}
                    </TableCell>
                    <TableCell
                      align="right"
                      className="second"
                      component={Link}
                      to={`/${this.state.board_name}/view/id=${row.postage_key}&board=${this.state.board_key}`}
                    >
                      {row.postage_title}
                    </TableCell>
                    <TableCell align="center" className="first">
                      {row.nickname}
                    </TableCell>
                    <TableCell align="center" className="first">
                      {row.postage_love}
                    </TableCell>
                    <TableCell align="center" className="first">
                      {row.time_diff}
                    </TableCell>
                    <TableCell align="center" className="first">
                      {row.see}
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49.8 * emptyRows }}>
                    <TableCell />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="pagination">
            <Pagination
              count={count}
              color="primary"
              onChange={handleChangePage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Postbody;
