import React, { Component } from "react";

class Leaderboard extends Component {
    constructor() {
        super();
        this.state = {
          data: []
        };
      }
    componentDidMount() {
        const request = new Request("http://127.0.0.1:8080/viewscore");
        fetch(request)
          .then(response => response.json())
          .then(data => this.setState({ data: data }));
        console.log(this.state.data);
    }
    render() {
    let val = localStorage.getItem("name");
    if (val != "admin") {
        return (
          <div>
            <header>
              <h1>Leaderboard</h1>
            </header>
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>PersonName</th>
                  <th>Total Score across all quizzes</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map(function(item, key) {
                  return (
                    <tr key={key}>
                      <td>{item.id}</td>
                      <td>{item.username}</td>
                      <td>{item.score}</td>
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
export default Leaderboard;
