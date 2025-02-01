import React from "react";
import { Handle } from "@xyflow/react";

const EventContentNode = (props) => {
  return (
    <>
      <Handle type="target" position="top" style={{ background: "#555" }} />
      {props.content}
      <Handle type="source" position="bottom" style={{ background: "#555" }} />
    </>
  );
};

export default EventContentNode;
