function socketMain(io, socket) {
  console.log("someone called me, socketmain.");

  socket.on("clientAuth", (key) => {
    if (key === "asijfioadjf") {
      // valid nodeClient
    }
  });

  socket.on("perfData", (data) => {
    console.log(data);
  });
}

module.exports = socketMain;
