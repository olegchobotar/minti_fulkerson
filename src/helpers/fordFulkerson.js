/*
 * A graph that contains nodes and vertice, stored as an adjacency matrix.
 * @constructor  
 */
function Graph() {
    this.adjMatrix = [];  // Once we add a node, this will also contain sub arrays. Edge weights are stored in [i][j], where i is the name of the 'from' node and j is the 'to' node
    this.idList = [];  // The name associated with each node.
}

function Queue() {
    var queue = [];

    this.dequeue = function () {
        if (queue.length === 0) {
            return undefined;
        } else {
            return queue.shift();
        }
    };

    this.enqueue = function (item) {
        queue.push(item);
    };

    this.getLength = function () {
        return queue.length;
    };

    this.isEmpty = function () {
        return (queue.length == 0);
    };

    this.getContents = function () {
        return queue;
    };
}

/*
 * Adds a new node to the graph with name 'id'. 
 */
Graph.prototype.addNode = function (id) {
    // Ensure the id provided is unique by seeing if it doesn't already exists in the idList.
    for (let i = 0; i < this.idList.length; i++) {
        if (this.idList[i] == id) {
            console.log("A node with id", id, "already exists!");
            return;
        }
        ;
    }

    // Initialize new row with -inf's based on len of idList.
    var newRow = [];
    for (let i = 0; i < this.idList.length; i++) {
        newRow[i] = -Infinity;
    }

    // Add the newly made row to our graph's adjMatrix.
    this.adjMatrix.push(newRow);

    // Add the id provided to our graph's idList
    this.idList.push(id);

    // Add new column to each row in our adjMatrix. Do this by appending -Infinity to each row.
    for (let i = 0; i < this.idList.length; i++) {
        this.adjMatrix[i].push(-Infinity);
    }
};


Graph.prototype.deleteNode = function (id) {
    var found = false;
    var index;

    //confirm node exists
    for (let i = 0; i < this.idList.length; i++) {
        if (this.idList[i] == id) {
            found = true;
            index = i;
            break;
        }
        ;
    }
    ;

    if (found == false) {
        console.log("The node with id", id, "wasn't found.");
        return;
    }
    ;

    //if found, find its index in the idList, k
    for (let i = 0; i < this.adjMatrix.length; i++) {
        if (this.idList[i] == id) {
            index = i;
            break;
        }
    }
    ;

    //splice out the [index]th element in idList
    this.idList.splice(index, 1);

    //splice out the [index]th row in adjMatrix
    this.adjMatrix.splice(index, 1);

    //splice out [index]th element from all other arrays
    for (let i = 0; i < this.adjMatrix.length; i++) {
        this.adjMatrix[i].splice(index, 1);
    }
    ;
};

Graph.prototype.addEdge = function (id1, id2, weight) {
//NOTE: id1 is the 'from' node and id2 is the 'to' node
//confirm if id1 and id2 are found in idList, confirming nodes are in graph
//also find index of id1, i, and id2, j, in idList
    let found1 = false;
    let found2 = false;
    var index1, index2;
    for (let i = 0; i < this.idList.length; i++) {
        if (this.idList[i] == id1 || this.idList[i] == id2) {
            if (this.idList[i] == id1) {
                found1 = true;
                index1 = i;
            }
            ;
            if (this.idList[i] == id2) {
                found2 = true;
                index2 = i;
            }
            ;
        }
        ;
    }
    ;

    if ((found1 && found2) != true) {
        console.log("One of the nodes you provided aren't in the graph, so the edge can't be made.");
        return;
    }
    ;
    this.adjMatrix[index1][index2] = weight;
};

Graph.prototype.updateEdge = function (id1, id2, newWeight) {
    //NOTE : this method is the same as addEdge. Only added it for readability
    this.addEdge(id1, id2, newWeight);
};

Graph.prototype.deleteEdge = function (id1, id2) {
//NOTE: id1 is the 'from' node and id2 is the 'to' node
//confirm if id1 and id2 are found in idList, confirming nodes are in graph
//also find index of id1, i, and id2, j, in idList
    let found1 = false;
    let found2 = false;
    var index1, index2;
    for (let i = 0; i < this.idList.length; i++) {
        if (this.idList[i] === id1 || this.idList[i] === id2) {
            if (this.idList[i] === id1) {
                found1 = true;
                index1 = i;
            }
            if (this.idList[i] === id2) {
                found2 = true;
                index2 = i;
            }
        }
        ;
    }
    ;

    if ((found1 && found2) !== true) {
        console.log("One of the nodes you provided aren't in the graph, so the edge can't be made.");
        return;
    }
    ;
    this.adjMatrix[index1][index2] = -Infinity;
};

Graph.prototype.print = function () {
    console.log("FROM\\TO", this.idList);
    for (let i = 0; i < this.adjMatrix.length; i++) {
        console.log("'" + this.idList[i] + "'", this.adjMatrix[i], "\n");
    }
    ;
    console.log("\n");
};

//getedges() : returns a list of edges in the format (from, to)

Graph.prototype.getIdIndex = function (id) {
    for (let i = 0; i < this.idList.length; i++) {
        if (id == this.idList[i]) {
            return i;
        }
        ;
    }
    ;
    console.log("node with id", id, "doesn't exist in this graph.");
    return undefined;
};

Graph.prototype.getNeighbours = function (id) {
    //description : returns all nodes reachable from the provided node
    //find index of id in idList
    var found = false;
    var index;

    //confirm node exists
    for (let i = 0; i < this.idList.length; i++) {
        if (this.idList[i] == id) {
            found = true;
            index = i;
            break;
        }
        ;
    }
    ;


    //if it doesn't exist, tell 'em
    if (found == false) {
        console.log("The node with id", id, "wasn't found.");
        return;
    }
    ;

    //make array of neighbours
    let neighbours = [];
    for (let i = 0; i < this.adjMatrix[index].length; i++) {
        if (this.adjMatrix[index][i] !== -Infinity && this.adjMatrix[index][i] !== 0) {  //if edge cap is 0, it can't carry flow, so it might as well not exist...
            neighbours.push(this.idList[i]);
        }
        ;
    }
    ;
    return neighbours;
};

//Breadth First Search-----------------------------------------------------------------------------
function BFS(G, src, destination) {

    let pred = {};
    let dist = {};
    let visited = [src];
    let Q = new Queue();

    for (let q = 0; q < G.idList.length; q++) {
        let cur = G.idList[q];
        pred[cur] = undefined;
        dist[cur] = Infinity;
    }

    Q.enqueue(src);
    dist[src] = 0;

    while (Q.isEmpty() === false) {
        var current = Q.dequeue();

        if (G.getNeighbours(current) === undefined) {
            continue;
        }
        ;

        var neighbours = G.getNeighbours(current);
        for (let i = 0; i < neighbours.length; i++) {
            if (!visited.includes(neighbours[i])) {
                pred[neighbours[i]] = current;
                dist[neighbours[i]] = dist[current] + 1;

                if (neighbours[i] == destination) {
                    return {
                        "path": getPath(pred, src, destination),
                        "dist": dist[destination],
                        "visited": visited
                    };
                }
                ;
                //make sure we haven't visited the node already

                visited.push(neighbours[i]);
                Q.enqueue(neighbours[i]);
            }
            ;
        }
        ;
    }
    ;
    return {
        "path": [],
        "dist": 0,
        "visited": visited
    };
};

function getPath(pred, src, dest) {
    var current = dest;
    let path = [];
    while (current != undefined) {
        path.unshift(current);
        current = pred[current];
    }
    ;
    return path;
};

//Residual Graph-----------------------------------------------------------------------------------
/*
 * The residual graph which is generated based on a given Graph object. Used in FordFukerson().
 * @constructor
 * @extends {Graph}
 */
ResidualGraph.prototype = new Graph();

function ResidualGraph(G) {

    this.adjMatrix = [];
    this.idList = [];

    this.init = function (G) {
        //deep cloning the adjMatrix and idList
        for (let i = 0; i < G.adjMatrix.length; i++) {
            let row = [];
            for (let j = 0; j < G.adjMatrix[i].length; j++) {
                row.push(G.adjMatrix[i][j]);
            }
            ;
            this.adjMatrix.push(row);
            this.idList.push(G.idList[i]);
        }
        ;

        //adding the residual edges
        for (let i = 0; i < G.adjMatrix.length; i++) {
            for (let j = 0; j < G.adjMatrix[i].length; j++) {
                if (i != j && G.adjMatrix[i][j] != -Infinity) {
                    this.adjMatrix[j][i] = 0;
                }
                ;
            }
            ;
        }
        ;
    };
    this.init(G);  //run the init on creation of an instance!

    this.minCapacity = function (path) {
        var min = Infinity;
        for (let i = 1; i < path.length; i++) {
            let from = path[i - 1];
            let to = path[i];
            var fromIndex;
            var toIndex;
            for (let j = 0; j < this.idList.length; j++) {
                if (this.idList[j] == from) {
                    fromIndex = j;
                }
                ;
                if (this.idList[j] == to) {
                    toIndex = j;
                }
                ;
            }
            ;
            let value = this.adjMatrix[fromIndex][toIndex];
            if (value < min) {
                min = value;
            }
            ;
        }
        ;
        return min;
    };

    this.adjustEdgesInPath = function (path, val) {
        //adds val to each edge on path

        //iterate through the path
        for (let j = 1; j < path.length; j++) {
            let from = this.getIdIndex(path[j - 1]);
            let to = this.getIdIndex(path[j]);

            if (from == undefined || to == undefined) {
                console.log('something went wrong...');
                return;
            }
            ;

            let currentVal = this.adjMatrix[from][to];
            this.adjMatrix[from][to] -= val;
            this.adjMatrix[to][from] += val;
        }
        ;
    };
};

//Ford-Fulkerson-----------------------------------------------------------------------------------
function FordFulkerson(G, src, sink) {

    var RS = new ResidualGraph(G);
    let res;
    while (true) {
        res = BFS(RS, src, sink);
        let path = res['path'];
        if (path.length == 0) {
            break;
        }
        ;

        //find min
        var min = RS.minCapacity(path);
        RS.adjustEdgesInPath(path, min);

    }
    ;

    let S = res['visited'];
    //visited now contains all nodes in the S part of the S-T cut. Find all out-going from them.
    let cut = new Set();
    let flow = 0;
    for (let k = 0; k < S.length; k++) {
        var s = G.getNeighbours(S[k]);
        let x = G.getIdIndex(S[k]);
        for (let l = 0; l < s.length; l++) {
            if (!S.includes(s[l])) {
                cut.add([S[k], s[l]]);
                flow += G.adjMatrix[G.getIdIndex(S[k])][G.getIdIndex(s[l])];
            }
            ;
        }
        ;
    }
    ;

    console.log("MAX FLOW:", flow);
    console.log("MIN CUT", cut);
    return { flow, cut }
};

export const calculateMaxFlow = (startVertex, finishVertex, vertices) => {
    const graph = new Graph();
    const nodeNames = getNodeNames(startVertex, finishVertex, vertices);

    nodeNames.forEach(node => {
        graph.addNode(node);
    });
    vertices.forEach(vertex => {
        graph.addEdge(vertex.start, vertex.finish, +vertex.weight);
    })

    return FordFulkerson(graph, startVertex, finishVertex);
}

export const getNodeNames = (startVertex, finishVertex, vertices) => {
    const nodeStartNames = vertices.map(vertex => vertex.start);
    const nodeFinishNames = vertices.map(vertex => vertex.finish);
    return new Set([startVertex, finishVertex, ...nodeStartNames, ...nodeFinishNames])
}
