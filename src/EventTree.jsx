import ELK from "elkjs/lib/elk.bundled.js";
import React, { useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Panel,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";

import EventContentNode from "./EventContentNode.jsx";
import { initialEdges, initialNodes } from "./nodes.jsx";
import "@xyflow/react/dist/style.css";

const elk = new ELK();

const nodeTypes = { eventContent: EventContentNode };

const defaultOptions = {
  "elk.algorithm": "layered",
  "elk.layered.spacing.nodeNodeBetweenLayers": 100,
  "elk.spacing.nodeNode": 80,
};

const LayoutFlow = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const getLayoutedElements = (options) => {
    const layoutOptions = { ...defaultOptions, ...options };
    const graph = {
      id: "root",
      layoutOptions: layoutOptions,
      children: nodes.map((node) => ({
        ...node,
        width: node.measured.width,
        height: node.measured.height,
      })),
      edges: [...edges],
    };

    elk.layout(graph).then(({ children }) => {
      let newChildren = children.map((node) => {
        let x = { ...node, position: { x: node.x, y: node.y } };
        return x;
      });

      setNodes(newChildren);
    });
  };

  return (
    <>
      <button onClick={() => getLayoutedElements({ "elk.direction": "DOWN" })}>
        Vertical layout
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        key="1"
        zoomOnScroll={false}
        panOnScroll
      ></ReactFlow>
    </>
  );
};

export default function () {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
}
