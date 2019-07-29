import React, { Component } from "react";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        firstName: "",
        passwd: ""
      },
      submitted: false
    };
    this.handleFChange = this.handleFChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:8080/signup", {
      method: "POST",
      body: JSON.stringify(this.state.formData)
    }).then(response => {
      if (response.status >= 200 && response.status < 300)
        this.setState({ submitted: true });
      else alert("Username exists");
    });
  }

  handleFChange(event) {
    this.state.formData.username = event.target.value;
  }
  handlePChange(event) {
    this.state.formData.password = event.target.value;
  }

  render() {
    return (
      <div>
        <header>
          <h1>Create a New Person</h1>
        </header>
        <br />
        <br />
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>User Name</label>
              <input
                type="text"
                value={this.state.username}
                onChange={this.handleFChange}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                value={this.state.password}
                onChange={this.handlePChange}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>

        {this.state.submitted && (
          <div>
            <h2>New person successfully added.</h2>
          </div>
        )}
      </div>
    );
  }
}

export default Signup;
