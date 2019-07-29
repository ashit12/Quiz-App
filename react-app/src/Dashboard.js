import React, { Component } from "react";

class Dashboard extends Component {
  render() {
    let val = localStorage.getItem("name");
    if (val == "admin") {
      return (
        <div>
          <h1>Hello admin</h1>
          Select any option from the navigation bar to proceed
        </div>
      );
    } else {
      return (
        <div>
          <h1>Hello user</h1>
          Select any option from the navigation bar to proceed
        </div>
      );
    }
  }
}
export default Dashboard;
