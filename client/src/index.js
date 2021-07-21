import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Time from "./Time";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      UserID: "",
      DateTime: "",
      username: "",
      Password: "",
    };
  }

  handleUserChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handleSubmit = (e) => {
    axios.get(`/user/${this.state.username}`).then((response) => {
      this.setState({
        DateTime: response.data.DateTime,
        Password: response.data.Password,
      });
    });
    e.preventDefault();
  };

  render() {
    return (
      <div className="container">
        <form className="form-container" onSubmit={this.handleSubmit}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="UserID"
              aria-label="UserID"
              aria-describedby="basic-addon2"
              value={this.state.username}
              onChange={this.handleUserChange}
            />
            <div className="input-group-append">
              <input
                type="submit"
                className="btn btn-outline-secondary"
                value="Submit"
              />
            </div>
          </div>
        </form>
        <div>
          Time until you can change password:
          <Time
            time={30 - parseInt((new Date() - this.state.DateTime) / 1000)}
          />
        </div>

        <div>Current password: {this.state.Password}</div>
      </div>
    );
  }
}

ReactDOM.render(<App></App>, document.getElementById("root"));
