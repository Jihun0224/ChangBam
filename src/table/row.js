import React from "react";
import "./table.css";

class Row extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="row_title">
            <span>제목 : </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Row;
