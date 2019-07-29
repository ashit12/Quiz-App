import React, { Component } from "react";

class AddQuestion extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        ques: "",
        o1: "",
        o2: "",
        o3: "",
        o1b: false,
        o2b: false,
        o3b: false
      },
      submitted: false
    };
    this.handleQChange = this.handleQChange.bind(this);
    this.handleO1Change = this.handleO1Change.bind(this);
    this.handleO2Change = this.handleO2Change.bind(this);
    this.handleO3Change = this.handleO3Change.bind(this);
    this.handleO1bChange = this.handleO1bChange.bind(this);
    this.handleO2bChange = this.handleO2bChange.bind(this);
    this.handleO3bChange = this.handleO3bChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    let id = this.props.match.params.id;
    event.preventDefault();
    if (
      this.state.formData.ques == "" ||
      this.state.formData.o1 == "" ||
      this.state.formData.o2 == "" ||
      this.state.formData.o3 == ""
    ) {
      alert("One or more fields is empty");
    } else if (
      this.state.formData.o1b == false &&
      this.state.formData.o2b == false &&
      this.state.formData.o3b == false
    ) {
      alert("No correct answer is provided");
    } else {
      fetch("http://localhost:8080/addquestion/" + id, {
        method: "POST",
        body: JSON.stringify(this.state.formData)
      }).then(response => {
        if (response.status >= 200 && response.status < 300)
          this.setState({ submitted: true });
      });
    }
  }
  handleQChange(event) {
    this.state.formData.ques = event.target.value;
  }
  handleO1Change(event) {
    this.state.formData.o1 = event.target.value;
  }
  handleO2Change(event) {
    this.state.formData.o2 = event.target.value;
  }
  handleO3Change(event) {
    this.state.formData.o3 = event.target.value;
  }
  handleO1bChange(event) {
    let val1 = { ...this.state.formData, o1b: true };
    let val2 = { ...this.state.formData, o1b: false };
    if (event.target.checked == true) {
      this.setState({ formData: val1 });
    } else {
      this.setState({ formData: val2 });
    }
  }
  handleO2bChange(event) {
    let val1 = { ...this.state.formData, o2b: true };
    let val2 = { ...this.state.formData, o2b: false };
    if (event.target.checked == true) {
      this.setState({ formData: val1 });
    } else {
      this.setState({ formData: val2 });
    }
  }
  handleO3bChange(event) {
    let val1 = { ...this.state.formData, o3b: true };
    let val2 = { ...this.state.formData, o3b: false };
    if (event.target.checked == true) {
      this.setState({ formData: val1 });
    } else {
      this.setState({ formData: val2 });
    }
  }
  render() {
    let val = localStorage.getItem("name");
    if (val == "admin") {
      return (
        <div>
          <header>
            <h1>Add a New Question</h1>
          </header>
          <br />
          <br />
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label>Question</label>
                <input
                  type="text"
                  value={this.state.ques}
                  onChange={this.handleQChange}
                />
              </div>
              <div>
                <label>Option1</label>
                <input
                  type="text"
                  value={this.state.o1}
                  onChange={this.handleO1Change}
                />
                <label>Yes</label>
                <input
                  type="checkbox"
                  value={this.state.o1b}
                  onChange={this.handleO1bChange}
                />
              </div>
              <div>
                <label>Option2</label>
                <input
                  type="text"
                  value={this.state.o2}
                  onChange={this.handleO2Change}
                />
                <label>Yes</label>
                <input
                  type="checkbox"
                  value={this.state.o2b}
                  onChange={this.handleO2bChange}
                />
              </div>
              <div>
                <label>Option3</label>
                <input
                  type="text"
                  value={this.state.o3}
                  onChange={this.handleO3Change}
                />
                <label>Yes</label>
                <input
                  type="checkbox"
                  value={this.state.o3b}
                  onChange={this.handleO3bChange}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>

          {this.state.submitted && (
            <div>
              <h2>New question successfully added.</h2>
            </div>
          )}
        </div>
      );
    } else {
      return <h1>Access forbidden</h1>;
    }
  }
}

export default AddQuestion;
