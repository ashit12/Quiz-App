import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";

class Scores extends Component {
  render() {
    let val = localStorage.getItem("name");
    let id = this.props.match.params.id;
    if (val != "admin") {
      return (
        // <div>
          <div>You scored {id} points</div>
        //   <Link to={"/Dashboard"}>Dashboard</Link>
        // </div>
      );
    } else {
      return <h1>Access forbidden</h1>;
    }
  }
}
export default Scores;
