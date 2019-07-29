import React, { Component } from "react";
import PropTypes from "prop-types";

//Solve the reload part

class ViewQuiz extends Component {
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

  componentDidMount() {
    const request = new Request("http://127.0.0.1:8080/viewquiz");
    fetch(request)
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
  }

  deletethis(id) {
    fetch("http://localhost:8080/quiz/" + id, {
      method: "DELETE"
    });
    window.location.reload();
  }

  editthis(id) {
    this.context.router.history.push("/Viewpartquiz/" + id);
  }

  render() {
    let edit = this.editthis;
    let del = this.deletethis;
    let val = localStorage.getItem("name");
    if (val == "admin") {
      return (
        <div>
          <header>
            <h1>View Quiz</h1>
          </header>

          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(function(item, key) {
                return (
                  <tr key={key}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => del(item.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => edit(item.id)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <h1>Access forbidden</h1>;
    }
  }
}

export default ViewQuiz;
