import React, { Component } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Signup from "./Signup";
import ViewPeople from "./ViewPeople";
import AddQuiz from "./AddQuiz";
import AddQuestion from "./AddQuestion";
import EditQuestion from "./EditQuestion";
import ViewQuiz from "./ViewQuiz";
import Viewpartquiz from "./Viewpartquiz";
import Play from "./Play";
import Scores from "./Scores";
import Leaderboard from "./Leaderboard";
import Choose from "./Choose";
import Logout from "./Logout";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
      return (
        <Router>
          <div>
          {!localStorage.getItem('name')&&
          <div>
            <nav className="navbar navbar-inverse">
              <div className="container-fluid">
                <ul className="nav navbar-nav">
                  <li>
                    <Link to={"/"}>Home</Link>
                  </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <span className="glyphicon glyphicon-user" />
                    <Link to={"/Login"}>Login</Link>
                  </li>
                  <li>
                    <span className="glyphicon glyphicon-log-in" />
                    <Link to={"/Signup"}>Signup</Link>
                  </li>
                </ul>
              </div>
            </nav>
            </div>
          }
          {localStorage.getItem('name')=="admin"&&
          <div>
            <nav className="navbar navbar-inverse">
              <div className="container-fluid">
                <ul className="nav navbar-nav">
                  <li>
                    <Link to={"/Dashboard"}>Dashboard</Link>
                  </li>
                  <li>
                    <Link to={"/ViewPeople"}>View People</Link>
                  </li>
                  <li>
                    <Link to={"/AddQuiz"}>Add Quiz</Link>
                  </li>
                  <li>
                    <Link to={"/ViewQuiz"}>View Quiz</Link>
                  </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <span className="glyphicon glyphicon-user" />
                    <Link to={"/Logout"}>Logout</Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          }
          {localStorage.getItem('name')&&localStorage.getItem('name')!="admin"&&
          <div>
            <nav className="navbar navbar-inverse">
              <div className="container-fluid">
                <ul className="nav navbar-nav">
                  <li>
                    <Link to={"/Dashboard"}>Dashboard</Link>
                  </li>
                  <li>
                    <Link to={"/Choose"}>Play</Link>
                  </li>
                  <li>
                    <Link to={"/Leaderboard"}>Leaderboard</Link>
                  </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <span className="glyphicon glyphicon-user" />
                    <Link to={"/Logout"}>Logout</Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          }
            <Switch>
              <Route exact path="/Login" component={Login} />
              <Route exact path="/Logout" component={Logout} />
              <Route exact path="/Leaderboard" component={Leaderboard} />
              <Route exact path="/Signup" component={Signup} />
              <Route exact path="/Dashboard" component={Dashboard} />
              <Route exact path="/ViewPeople" component={ViewPeople} />
              <Route exact path="/AddQuiz" component={AddQuiz} />
              <Route exact path="/ViewQuiz" component={ViewQuiz} />
              <Route exact path="/Viewpartquiz/:id" component={Viewpartquiz} />
              <Route
                exact
                path="/Viewpartquiz/AddQuestion/:id"
                component={AddQuestion}
              />
              <Route exact path="/EditQuestion/:id" component={EditQuestion} />
              <Route exact path="/Choose" component={Choose} />
              <Route exact path="/Play/:id" component={Play} />
              <Route exact path="/Scores/:id" component={Scores} />
            </Switch>
            </div>
        </Router>
      );
  }
}

export default App;
