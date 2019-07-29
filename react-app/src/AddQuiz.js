import React, { Component } from "react";

class AddQuiz extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        title: "",
        category: "",
        question: []
      },
      submitted: false
    };
    this.handleTChange = this.handleTChange.bind(this);
    this.handleCChange = this.handleCChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.formData.title == "" || this.state.formData.category == "") {
      alert("One or more fields are empty");
    } else {
      fetch("http://localhost:8080/addquiz", {
        method: "POST",
        body: JSON.stringify(this.state.formData)
      }).then(response => {
        if (response.status >= 200 && response.status < 300)
          this.setState({ submitted: true });
        else alert("Quiz with same title already exists");
      });
    }
  }

  handleTChange(event) {
    this.state.formData.title = event.target.value;
  }
  handleCChange(event) {
    this.state.formData.category = event.target.value;
  }

  render() {
    let val = localStorage.getItem("name");
    if (val == "admin") {
      return (
        <div>
          <div className="container text-center">
            <h1>Create a New Quiz</h1>
            <div className="form-group">
              <form onSubmit={this.handleSubmit}>
                <div>
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.title}
                    onChange={this.handleTChange}
                  />
                </div>
                <div>
                  <label>Category</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.category}
                    onChange={this.handleCChange}
                  />
                </div>
                <br />
                <button
                  type="submit"
                  className="btn btn-outline-secondary btn-secondary active"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>

          {this.state.submitted && (
            <div>
              <h2>New quiz successfully added.</h2>
            </div>
          )}
        </div>
      );
    } else {
      return <h1>Access Forbidden</h1>;
    }
  }
}

export default AddQuiz;
