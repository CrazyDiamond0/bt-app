import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      UserID: "",
      DateTime: "",
    };
  }

  handleUserChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handleSubmit = (e) => {
    console.log(this.state.username);
    axios.get(`/user/${this.state.username}`).then((response) => {
      console.log(response.data);
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
      </div>
    );
  }
}

ReactDOM.render(<App></App>, document.getElementById("root"));
