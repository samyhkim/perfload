import React, { Component } from "react";
import Cpu from "./Cpu";
import Mem from "./Mem";
import Info from "./Info";
import "./Widget.css";

class Widget extends Component {
  state = {};

  render() {
    const {
      freeMem,
      totalMem,
      usedMem,
      memUsage,
      osType,
      upTime,
      cpuModel,
      numCores,
      cpuSpeed,
      cpuLoad,
      macA,
    } = this.props.data;
    const cpu = { cpuLoad };
    const mem = { freeMem, totalMem, usedMem, memUsage };
    const info = { macA, osType, upTime, cpuModel, numCores, cpuSpeed };

    return (
      <div>
        <h1>Widget</h1>
        <Cpu cpuData={cpu} />
        <Mem memData={mem} />
        <Info infoData={info} />
      </div>
    );
  }
}

export default Widget;
