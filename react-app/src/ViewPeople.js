import React, { Component } from "react";

//Solve the reload part

class ViewPerson extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.deletethis = this.deletethis.bind(this);
  }

  componentDidMount() {
    const request = new Request("http://127.0.0.1:8080/viewpeople");
    fetch(request)
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
  }
  
  deletethis(id) {
    fetch("http://localhost:8080/people/" + id, {
      method: "DELETE"
    });
    window.location.reload();
  }

  render() {
    let val = localStorage.getItem("name");
    let del = this.deletethis;
    if (val == "admin") {
      return (
        <div>
          <header>
            <h1>View People</h1>
          </header>

          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(function(item, key) {
                return (
                  <tr key={key}>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => del(item.id)}
                      >
                        Delete
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

export default ViewPerson;
