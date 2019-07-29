import React, { Component } from "react";
import PropTypes from "prop-types";

class Logout extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  componentDidMount() {
    localStorage.clear();
    window.location.reload();
    this.context.router.history.push("/");
  }
  render() {
    return <h1>Logged out</h1>;
  }
}
export default Logout;
