import React, { Component } from "react";

class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.time >= 0) {
      return <label> {this.props.time} seconds</label>;
    } else {
      return <label></label>;
    }
  }
}

export default Time;
