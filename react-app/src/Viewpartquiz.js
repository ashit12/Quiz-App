import React, { Component } from "react";
import PropTypes from "prop-types";

class Viewpartquiz extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.deletethis = this.deletethis.bind(this);
    this.editthis = this.editthis.bind(this);
  }
  static contextTypes = {
    router: PropTypes.object
  };

  deletethis(id) {
    fetch("http://localhost:8080/deleteques/" + id, {
      method: "DELETE"
    });
    this.context.router.history.push("/ViewQuiz");
  }

  editthis(id) {
    this.context.router.history.push("/EditQuestion/" + id);
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    const request = new Request("http://127.0.0.1:8080/viewpartquiz/" + id);
    fetch(request)
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
  }

  redirect() {
    let id = this.props.match.params.id;
    this.context.router.history.push("AddQuestion/" + id);
  }
  render() {
    let edit = this.editthis;
    let del = this.deletethis;
    let val = localStorage.getItem("name");
    if (val == "admin") {
      return (
        <div>
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>Question Number</th>
                <th>Question</th>
                <th>Option1</th>
                <th>Option2</th>
                <th>Option3</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(function(item, key) {
                return (
                  <tr key={key}>
                    <td>{item.id}</td>
                    <td>{item.ques}</td>
                    <td>{item.o1}</td>
                    <td>{item.o2}</td>
                    <td>{item.o3}</td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => del(item.id)}
                      >
                        {" "}
                        Delete{" "}
                      </button>
                      <button
                        className="btn btn-info"
                        onClick={() => edit(item.id)}
                      >
                        {" "}
                        Edit{" "}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button
            className="btn btn-success text-center"
            onClick={() => this.redirect()}
          >
            Add
          </button>
        </div>
      );
    } else {
      return <h1>Access forbidden</h1>;
    }
  }
}

export default Viewpartquiz;
