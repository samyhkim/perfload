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
      isActive,
    } = this.props.data;
    const cpu = { cpuLoad };
    const mem = { freeMem, totalMem, usedMem, memUsage };
    const info = { macA, osType, upTime, cpuModel, numCores, cpuSpeed };
    let notActiveDiv = "";
    if (!isActive) {
      notActiveDiv = <div className="not-active">Offline</div>;
    }

    return (
      <div className="widget col-sm-12">
        {notActiveDiv}
        <h1>Widget</h1>
        <Cpu cpuData={cpu} />
        <Mem memData={mem} />
        <Info infoData={info} />
      </div>
    );
  }
}

export default Widget;
