import React from "react";
import "./searchbar.css";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";

class Search extends React.Component {
  render() {
    return (
      <div>
        <Paper component="form" className="root">
          <FormControl className="select">
            <select className="searchType">
              <option value={10}>내용</option>
              <option value={20}>제목</option>
              <option value={20}>글쓴이</option>
              <option value={30}>제목+내용</option>
            </select>
          </FormControl>

          <InputBase
            className="input"
            placeholder="검색어를 입력하세요"
            inputProps={{ "aria-label": "search google maps" }}
          />

          <IconButton type="submit" className="iconButton" aria-label="search">
            <SearchIcon />
          </IconButton>

        </Paper>
      </div>
    );
  }
}

export default Search;
