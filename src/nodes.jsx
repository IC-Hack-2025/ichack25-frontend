export const initialNodes = [
  {
    id: "1",
    type: "eventContent",
    data: { label: "input" },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    type: "eventContent",
    data: { label: "node 2" },
    position: { x: 0, y: 0 },
  },
  {
    id: "2a",
    type: "eventContent",
    data: { label: "node 2a" },
    position: { x: 0, y: 0 },
  },
  {
    id: "2b",
    type: "eventContent",
    data: { label: "node 2b" },
    position: { x: 0, y: 300 },
  },
  {
    id: "2c",
    type: "eventContent",
    data: { label: "node 2c" },
    position: { x: 0, y: 400 },
  },
  {
    id: "2d",
    type: "eventContent",
    data: { label: "node 2d" },
    position: { x: 0, y: 500 },
  },
  {
    id: "3",
    type: "eventContent",
    data: { label: "node 3" },
    position: { x: 200, y: 100 },
  },
];

export const initialEdges = [
  { id: "e12", source: "1", target: "2", animated: true },
  { id: "e13", source: "1", target: "3", animated: true },
  { id: "e22a", source: "2", target: "2a", animated: true },
  { id: "e22b", source: "2", target: "2b", animated: true },
  { id: "e22c", source: "2", target: "2c", animated: true },
  { id: "e2c2d", source: "2c", target: "2d", animated: true },
];
