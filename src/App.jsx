import "./App.css";
import EventTree from "./EventTree";
import { Input } from "./Input";
import { Loader } from "./Loader";
import { useEffect, useState } from "react";
import { initialEdges, initialNodes } from "./nodes";
import { socket } from ".";
import { getLayoutedElements } from "./elkLayout";

function App() {

  const [loadingState, setLoadingState] = useState(-1);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const handleChange = (e) => {
    //console.log(e.target.value);
  };
  const onSubmit = (value) => {
    // handleSubmit(e);
    console.log("SUBMITTED " + value);
    socket.emit("request_timeline", value);
    //console.log("submitted");
  };

  useEffect(() => {
    socket.on("add_node", (node) => {
      setNodes((nodes) => [...nodes, { id: node.id.toString(), data: { label: 'Node ' + node.id.toString() }, position: { x: 0, y: 0 } },]);
    });
    socket.on("add_arc", (arc) => {
      setEdges((edges) => [...edges, { id: arc.id.toString(), source: arc.from_id.toString(), target: arc.to_id.toString(), animated: true}]);
    });
  }, [])

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
  var { nodes: transformedNodes, edges: transformedEdges } = getLayoutedElements(nodes, edges);
  console.log(transformedNodes);
  console.log(transformedEdges);


  return (
    <div className="App h-[100vh] w-[100vw]">

        <Input handleChange={handleChange} onSubmit={onSubmit}/>
        <Loader currentState={loadingState}/>
        <EventTree nodes={transformedNodes} edges={transformedEdges}/>

    </div>  
  );
}

export default App;