import React, { Component } from "react";
import PropTypes from "prop-types";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      loginData: {
        username: "",
        password: ""
      },
      submitted: false
    };
    this.handleLChange = this.handleLChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
  }
  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount(){
    let val = localStorage.getItem('name');
    if(val != null)
      this.context.router.history.push("/Dashboard");
  }

  handleSubmit = event => {
    event.preventDefault();
    fetch("http://localhost:8080/login", {
      method: "POST",
      body: JSON.stringify(this.state.loginData)
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        let val = 0;
        this.setState({ submitted: true });
        localStorage.setItem("name", this.state.loginData.username);
        response.json()
        .then(data => {
          val = data;
          localStorage.setItem("id", val);
          window.location.reload();
          this.context.router.history.push("/Dashboard");
        })
      } else alert("Wrong Username or Password");
    });
  };

  handleLChange(event) {
    this.state.loginData.username = event.target.value;
  }
  handlePChange(event) {
    this.state.loginData.password = event.target.value;
  }

  render() {
    return (
      <div className="container text-center">
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <label className="control-label">User Name</label>
          <input type="text" onChange={this.handleLChange} />
          <br />
          <label className="control-label">Password</label>
          <input type="password" onChange={this.handlePChange} />
          <br />
          <br />
          <button className="btn btn-success" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
