function bellmanFord(graph, start) {
    const distances = {};
    const predecessors = {};
  
    for (const vertex in graph) {
        distances[vertex] = vertex === start ? 0 : Infinity;
        predecessors[vertex] = null;
    }

    const edges = [];
    for (const src in graph) {
        for (const dest in graph[src]) {
            edges.push({
            src,
            dest,
            weight: graph[src][dest]
        })}
    }

    const vertices = Object.keys(graph);
    for (let i = 0; i < vertices.length - 1; i++) {
        for (const edge of edges) {
        const { src, dest, weight } = edge;
        if (distances[src] + weight < distances[dest]) {
            distances[dest] = distances[src] + weight;
            predecessors[dest] = src;
           }
        }
    }

    for (const edge of edges) {
        const { src, dest, weight } = edge;
        if (distances[src] + weight < distances[dest]) {
        throw new Error("Бесконечный отрицательный цикл");
        }
    }

    return {
        distances,
        predecessors
    };
}


function getAnswer(start, graph) {
    try {
        const startVertex = start;
        const result = bellmanFord(graph, startVertex);
        
        console.log(`Кратчайшие расстояния от вершины ${startVertex}:`);
        for (const vertex in result.distances) {
          console.log(`До ${vertex}: ${result.distances[vertex]}`);
        }
      
    } catch (error) {
        console.error(error.message);
    }
}

const graph = {
    'S': { 'T': 6, 'Y': 7 },
    'T': { 'X': 5, 'Z': -4, 'Y': 8 },
    'Y': { 'X': -3, 'Z': 9},
    'X': { 'T': -2,},
    'Z': { 'S': 2, 'X': 7}
};

getAnswer('S', graph)

const graph1 = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'C': -1, 'D': 5 },
    'C': { 'D': 8, 'E': 10},
    'D': { 'E': 2},
    'E': { }
};

getAnswer('A', graph1)

const graph2 = {
    'A': { 'B': 1 },
    'B': { 'C': -1 },
    'C': { 'A': -1 },
};

getAnswer('A', graph2)

const graph3 = {
    'S': { 'A': 4, 'B': 3},
    'A': { 'B': -2, 'F': 5},
    'B': { 'A': 1, 'C': 2 },
    'C': { 'F': 1},
    'F': { }
};

getAnswer('S', graph3)

const graph5 = {
    'A': { 'B': 3, 'C': 5 },
    'B': { 'C': -2, 'D': 1 },
    'C': { 'D': 4},
    'D': { }
};

getAnswer('A', graph5)