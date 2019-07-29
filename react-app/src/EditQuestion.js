import React, { Component } from "react";

class EditQuestion extends Component {
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
  componentDidMount() {
    let id = this.props.match.params.id;
    const request = new Request("http://127.0.0.1:8080/viewques/" + id);
    fetch(request)
      .then(response => response.json())
      .then(data => this.setState({ formData: data }));
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
      fetch("http://localhost:8080/updateques/" + id, {
        method: "PUT",
        body: JSON.stringify(this.state.formData)
      }).then(response => {
        if (response.status >= 200 && response.status < 300)
          this.setState({ submitted: true });
      });
    }
  }
  handleQChange(event) {
    let data = { ...this.state.formData, ques: event.target.value };
    this.setState({ formData: data });
  }
  handleO1Change(event) {
    let data = { ...this.state.formData, o1: event.target.value };
    this.setState({ formData: data });
  }
  handleO2Change(event) {
    let data = { ...this.state.formData, o2: event.target.value };
    this.setState({ formData: data });
  }
  handleO3Change(event) {
    let data = { ...this.state.formData, o3: event.target.value };
    this.setState({ formData: data });
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
            <h1>Update Question</h1>
          </header>
          <br />
          <br />
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label>Question</label>
                <input
                  type="text"
                  value={this.state.formData.ques}
                  onChange={this.handleQChange}
                />
              </div>
              <div>
                <label>Option1</label>
                <input
                  type="text"
                  value={this.state.formData.o1}
                  onChange={this.handleO1Change}
                />
                <label>Yes</label>
                <input
                  type="checkbox"
                  checked={this.state.formData.o1b}
                  onChange={this.handleO1bChange}
                />
              </div>
              <div>
                <label>Option2</label>
                <input
                  type="text"
                  value={this.state.formData.o2}
                  onChange={this.handleO2Change}
                />
                <label>Yes</label>
                <input
                  type="checkbox"
                  checked={this.state.formData.o2b}
                  onChange={this.handleO2bChange}
                />
              </div>
              <div>
                <label>Option3</label>
                <input
                  type="text"
                  value={this.state.formData.o3}
                  onChange={this.handleO3Change}
                />
                <label>Yes</label>
                <input
                  type="checkbox"
                  checked={this.state.formData.o3b}
                  onChange={this.handleO3bChange}
                />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>

          {this.state.submitted && (
            <div>
              <h2>Question successfully updated.</h2>
            </div>
          )}
        </div>
      );
    } else {
      return <h1>Access forbidden</h1>;
    }
  }
}

export default EditQuestion;
