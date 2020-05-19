const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/perfData", { useNewUrlParser: true });
const Machine = require("./models/Machine");

function socketMain(io, socket) {
  let macA;

  socket.on("clientAuth", (key) => {
    if (key === "asijfioadjf") {
      // valid nodeClient
      socket.join("clients");
    } else if ((key = "lksdoiajdfa")) {
      // valid ui client has joined
      socket.join("ui");
      console.log("A react client has joined.");
      Machine.find({}, (err, docs) => {
        docs.forEach((machine) => {
          // on load, assume all machines are offline
          machine.isActive = false;
          io.to("ui").emit("data", machine);
        });
      });
    } else {
      // an invalid client has joined, drop connection
      socket.disconnect(true);
    }
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected.");
    Machine.find({ macA: macA }, (err, docs) => {
      if (docs.length > 0) {
        // send one last emit to React
        docs[0].isActive = false;
        io.to("ui").emit("data", docs[0]);
      }
    });
  });

  // a machine has connected, check to see if it's new
  socket.on("initPerfData", async (data) => {
    // update our socket connect function scoped variable
    macA = data.macA;
    // now go check mongo
    const mongooseResponse = await checkAndAdd(data);
    console.log(mongooseResponse);
  });

  socket.on("perfData", (data) => {
    console.log("Tick...");
    io.to("ui").emit("data", data);
  });
}

function checkAndAdd(data) {
  // bc we are doing db stuff, js won't wait for db
  // so make this function a promise
  return new Promise((resolve, reject) => {
    Machine.findOne({ macA: data.macA }, (err, doc) => {
      if (err) {
        throw err;
        reject(err);
      } else if (doc === null) {
        // the record is not in the db, so add it
        let newMachine = new Machine(data);
        newMachine.save();
        resolve("Added machine.");
      } else {
        // it is in the db, just resolve
        resolve("Found machine.");
      }
    });
  });
}

module.exports = socketMain;
