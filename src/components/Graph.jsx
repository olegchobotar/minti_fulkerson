import React from "react";
import Graph from "react-graph-vis";

const GraphComponent = (props) => {
    const { nodes, vertices } = props;

    const getGraph = () => ({
        nodes: Array.from(nodes).map(node => ({
            id: node,
            label: node,
            title: node,
        })),
        edges: vertices.map(vertex => ({
            from: vertex.start,
            to: vertex.finish,
            label: vertex.weight.toString()
        }))
    })

    const options = {
        layout: {
            hierarchical: true
        },
        edges: {
            color: "#000000"
        },
        height: "500px"
    };

    return (
        <Graph
            graph={getGraph()}
            options={options}
        />
    );
}

export default GraphComponent;