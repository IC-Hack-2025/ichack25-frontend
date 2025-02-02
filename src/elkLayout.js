import dagre from 'dagre';

/**
 * Computes a layout for your graph.
 *
 * @param {Array} nodes - The nodes array from props.
 * @param {Array} edges - The edges array from props.
 * @param {string} direction - The direction of the layout: 'LR' (left-to-right) or 'TB' (top-to-bottom). Default is 'TB'.
 * @returns {Object} An object with the layouted nodes and edges.
 */
export const getLayoutedElements = (nodes, edges, direction = 'TB') => {
    // Initialize a new dagre graph
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    // Set the graph direction (e.g., 'LR' for left-to-right, 'TB' for top-to-bottom)
    dagreGraph.setGraph({ rankdir: direction });

    // Define the node dimensions (adjust based on your node design)
    const nodeWidth = 172;
    const nodeHeight = 36;

    // Set nodes in the dagre graph
    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    // Set edges in the dagre graph (dagre expects source and target IDs)
    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    // Compute the layout using dagre
    dagre.layout(dagreGraph);


// Update each node's position based on dagre's computed layout.
    // The positions returned by dagre are for the center of the nodes,
    // so we adjust them to set the top-left position for React Flow.
    nodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.targetPosition = direction === 'LR' ? 'left' : 'top';
        node.sourcePosition = direction === 'LR' ? 'right' : 'bottom';

        // Shift the dagre node position to get the top-left coordinates
        node.position = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
        };

        return node;
    });

    return { nodes, edges };
};