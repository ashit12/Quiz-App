import React, { Component } from "react";
import PropTypes from "prop-types";

//Solve the reload part

class Play extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      formData:{
        p_id: 0,
        q_id: 0,
        score: 0
      }
    };
  }
  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    const request = new Request("http://127.0.0.1:8080/viewpartquiz/" + id);
    fetch(request)
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
  }
  handleO1bChange = (event, key) => {
    let val = [...this.state.data];
    if (event.target.checked == true) {
      val[key].ansa = true;
    } else {
      val[key].ansa = false;
    }
    this.setState({ data: val });
  };
  handleO2bChange = (event, key) => {
    let val = [...this.state.data];
    if (event.target.checked == true) {
      val[key].ansb = true;
    } else {
      val[key].ansb = false;
    }
    this.setState({ data: val });
  }

  handleO3bChange = (event, key) => {
    let val = [...this.state.data];
    if (event.target.checked == true) {
      val[key].ansc = true;
    } else {
      val[key].ansc = false;
    }
    this.setState({ data: val });
  }

  submit() {
    let score = 0;
    for (let i = 0; i < this.state.data.length; i++) {
      let a1 = this.state.data[i].o1b;
      let a2 = this.state.data[i].o2b;
      let a3 = this.state.data[i].o3b;
      let b1 = this.state.data[i].ansa;
      let b2 = this.state.data[i].ansb;
      let b3 = this.state.data[i].ansc;
      if (a1 == true) {
        if (a1 != b1) {
          continue;
        }
      }
      if (a1 == false && b1 == true) {
        continue;
      }
      if (a2 == true) {
        if (a2 != b2) {
          continue;
        }
      }
      if (a2 == false && b2 == true) {
        continue;
      }
      if (a3 == true) {
        if (a3 != b3) {
          continue;
        }
      }
      if (a3 == false && b3 == true) {
        continue;
      }
      score = score + 1;
    }
    let pid = this.props.match.params.id;
    let qid = localStorage.getItem("id")
    let x = {
        Qid : Number(pid),
        Pid : Number(qid),
        Score : score
    }
    fetch("http://localhost:8080/updatescore", {
        method: "POST",
        body: JSON.stringify(x)
      }).then(response => {
        if (response.status >= 200 && response.status < 300)
          this.setState({ submitted: true });
      });
    this.context.router.history.push("/Scores/" + score);
  }

  render() {
    let o1change = this.handleO1bChange;
    let o2change = this.handleO2bChange;
    let o3change = this.handleO3bChange;
    let val = localStorage.getItem("name");
    if (val != "admin") {
      return (
        <div>
          {this.state.data.map(function(item, key) {
            return (
              <div>
                <div>Q{key + 1}</div>
                <div>{item.ques}</div>
                <div>
                  {item.o1}
                  <input
                    type="checkbox"
                    onClick={event => o1change(event, key)}
                  />
                </div>
                <div>
                  {item.o2}
                  <input
                    type="checkbox"
                    onClick={event => o2change(event, key)}
                  />
                </div>
                <div>
                  {item.o3}
                  <input
                    type="checkbox"
                    onClick={event => o3change(event, key)}
                  />
                </div>
              </div>
            );
          })}
          <button
            className="btn btn-warning text-center"
            onClick={() => this.submit()}
          >
            Submit
          </button>
        </div>
      );
    } else {
      return <h1>Access forbidden</h1>;
    }
  }
}

export default Play;
