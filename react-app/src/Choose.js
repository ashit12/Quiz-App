import React, { Component } from "react";
import PropTypes from "prop-types";

//Solve the reload part

class ViewQuiz extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.playthis = this.playthis.bind(this);
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

  playthis(id) {
    this.context.router.history.push("/Play/" + id);
  }

  render() {
    let play = this.playthis;
    let val = localStorage.getItem("name");
    if (val != "admin") {
      return (
        <div>
          <header>
            <h1>View Quiz</h1>
          </header>

          <table className="table table-hover table-bordered table-condensed">
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
                        className="btn btn-warning"
                        onClick={() => play(item.id)}
                      >
                        Play
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
