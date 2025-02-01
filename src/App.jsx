import "./App.css";
import { Card } from "./Card";
import EventTree from "./EventTree";

function App() {
  return (
    <div className="App">
      <form>
        <input type="text" placeholder="Enter prompt" />
        <input type="submit" value="Submit" />
      </form>
      <div style={{ height: "90vh", width: "100%" }}>
        <EventTree />
      </div>
    </div>
  );
}

export default App;
