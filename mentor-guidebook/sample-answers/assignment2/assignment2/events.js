import EventEmitter from "events";

const emitter = new EventEmitter();

emitter.on("time", (message) => {
  console.log("Time received: ", message);
});

const isMain = process.argv[1] && process.argv[1].endsWith("events.js");
if (isMain) {
  setInterval(() => {
    const currentTime = new Date().toString();
    emitter.emit("time", currentTime);
  }, 5000);
}

export default emitter;