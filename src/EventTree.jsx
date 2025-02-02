import React, { useEffect, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  useEdgesState,
  useNodesState,
} from "reactflow";
import dagre from "dagre";
import EventContentNode from "./EventContentNode";
import "reactflow/dist/style.css";
import { socket } from "./";

// Set the default node dimensions
const NODE_WIDTH = 172;
const NODE_HEIGHT = 36;

const nodeType = { eventContent: EventContentNode };

/**
 * Given arrays of nodes and edges, compute their layout using dagre.
 *
 * @param {Array} nodes - Array of node objects for ReactFlow.
 * @param {Array} edges - Array of edge objects for ReactFlow.
 * @param {string} direction - Graph direction: 'TB' (top-bottom) or 'LR' (left-right).
 * @returns {Object} layouted elements: { nodes: [...], edges: [...] }
 */
const getLayoutedElements = (nodes, edges, direction = "TB") => {
  // Create a new directed graph
  const dagreGraph = new dagre.graphlib.Graph();

  // Set an object for the default edge label (required by dagre)
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // Set the graph direction (e.g., top-to-bottom)
  dagreGraph.setGraph({ rankdir: direction, nodesep: 400, ranksep: 400 });

  // Add nodes to the dagre graph. You must provide node dimensions.
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  });

  // Add edges to the dagre graph.
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Compute the layout
  dagre.layout(dagreGraph);

  // Update each ReactFlow node with the computed position.
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    // Set these positions so that edges are rendered correctly.
    node.targetPosition = "top";
    node.sourcePosition = "bottom";

    // Dagre gives the center position of each node so adjust by half the width and height.
    node.position = {
      x: nodeWithPosition.x - NODE_WIDTH / 2,
      y: nodeWithPosition.y - NODE_HEIGHT / 2,
    };

    return node;
  });

  return { nodes: layoutedNodes, edges };
};

// Define some initial nodes and edges.
const initialNodes = [
  { id: "1", data: { label: "Node 1" }, position: { x: 0, y: 0 } },
  { id: "2", data: { label: "Node 2" }, position: { x: 0, y: 0 } },
  { id: "3", data: { label: "Node 3" }, position: { x: 0, y: 0 } },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3" },
];

const EventTree = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    socket.on("add_node", (node) => {
      setNodes((nodes) => [
        ...nodes,
        {
          id: node.id.toString(),
          type: "eventContent",
          data: {
            description: node.date_start,
            title: node.heading,
            srcs: [
              node.main_image_url,
              ...node.contents
                .filter((content) => !content.isText)
                .map((content) => content.image_url),
            ],
            ctaText: "Find out more",
            ctaLink: node.link,
            content: () => {
              return (
                <p>
                  {node.contents
                    .filter((content) => content.isText)
                    .map((content) => content.content)}
                </p>
              );
            },
          },
          position: { x: 0, y: 0 },
        },
      ]);
    });
    socket.on("add_arc", (arc) => {
      setEdges((edges) => [
        ...edges,
        {
          id: arc.id.toString(),
          source: arc.from_id.toString(),
          sourceHandle: "b",
          target: arc.to_id.toString(),
          targetHandle: "a",
          animated: true,
        },
      ]);
    });
  }, []);
  const layouted = getLayoutedElements(nodes, edges);

  return (
    <div style={{ height: "100vh" }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={layouted.nodes}
          edges={layouted.edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          draggable
          fitView
          nodeTypes={nodeType}
        >
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default EventTree;
