import React, { Component } from "react";

class ViewQuestion extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/question/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }
  render() {
    let val = localStorage.getItem("name");
    if(val=="admin"){
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All People</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
            <th>ID</th>
              <th>Category</th>
              <th>Question</th>
              <th>Option1</th>
              <th>Option2</th>
              <th>Option3</th>
              <th>Correct</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(function(item, key) {
              return (
                <tr key={key}>
                      <td>{item.id}</td>
                      <td>{item.category}</td>
                      <td>{item.ques}</td>
                      <td>{item.o1}</td>
                      <td>{item.o2}</td>
                      <td>{item.o3}</td>
                      <td>{item.correct}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }else{
    return(
      <h1>Access forbidden</h1>
    );
  }
  }
}

export default ViewQuestion;
