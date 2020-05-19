import React, { Component } from "react";
import "./App.css";
import socket from "../utilities/socketConnection";
import Widget from "./Widget";

class App extends Component {
  state = {
    performanceData: {},
  };

  componentDidMount() {
    socket.on("data", (data) => {
      // inside this callback, we just got some new data
      // update state to re-render App and child components
      const currentState = { ...this.state.performanceData };
      // currentState is an object, not an array
      currentState[data.macA] = data;
      this.setState({
        performanceData: currentState,
      });
    });
  }

  render() {
    console.log(this.state.performanceData);
    let widgets = [];
    const data = this.state.performanceData;
    // grab each machine, by property, from data
    Object.entries(data).forEach(([key, value]) => {
      widgets.push(<Widget key={key} data={value} />);
    });
    return <div className="App">{widgets}</div>;
  }
}

export default App;
