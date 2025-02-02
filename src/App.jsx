import "./App.css";
import EventTree from "./EventTree";
import { Input } from "./Input";
import { Loader } from "./Loader";
import { useState } from "react";

function App() {

  const [loadingState, setLoadingState] = useState(-1);

  const handleChange = (e) => {
    //console.log(e.target.value);
  };
  const onSubmit = (e) => {
    handleSubmit(e);
    e.preventDefault();
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

        <Input handleChange={handleChange} onSubmit={onSubmit}/>
        <Loader currentState={loadingState}/>
        <EventTree />

    </div>  
  );
}

export default App;