import "./App.css";
import EventTree from "./EventTree";
import { Input } from "./Input";
import { Loader } from "./Loader";
import { useEffect, useState } from "react";
import { initialEdges, initialNodes } from "./nodes";
import { socket } from ".";
import { source } from "motion/react-client";
import { useRef } from "react";

function App() {
  const [loadingState, setLoadingState] = useState(-1);
  const [treeKey, setTreeKey] = useState(0);

  const handleChange = (e) => {
    //console.log(e.target.value);
  };
  const onSubmit = (value) => {
    // handleSubmit(e);
    setTreeKey(treeKey + 1);
    console.log("SUBMITTED " + value);
    socket.emit("request_timeline", value);
    //console.log("submitted");
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission

    setLoadingState(0); // Start loading

    setTimeout(() => {
      setLoadingState(1); // Move to the next state after 3 seconds
    }, 3000);

    setTimeout(() => {
      setLoadingState(2); // Move to the next state after another 3 seconds
    }, 6000);

    setTimeout(() => {
      setLoadingState(3); // Move to the final state after another 3 seconds
    }, 9000);

    setTimeout(() => {
      setLoadingState(-1); // Hide the loader after completion
    }, 12000);
  };

  return (
    <div className="App h-[100vh] w-[100vw]">
      <Input handleChange={handleChange} onSubmit={onSubmit} />
      <Loader currentState={loadingState} />
      <EventTree key={treeKey} />
    </div>
  );
}

export default App;
