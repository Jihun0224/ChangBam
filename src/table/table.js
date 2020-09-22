import React, { Component } from "react";
import Row from "./row";
import "./table.css";

class Table extends React.Component {
  render() {
    return (
      <div>
        <div className="maintable">
          <Row />
        </div>
      </div>
    );
  }
}

export default Table;
