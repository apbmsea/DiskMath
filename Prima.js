function findMST(graph) {
    const edges = [];
    const parent = {};

    for (const [u, neighbors] of Object.entries(graph)) {
        for (const [v, weight] of Object.entries(neighbors)) {
            edges.push([weight, u, v]);
        }
    }

    edges.sort((a, b) => a[0] - b[0]);

    function find(v) {
        if (parent[v] === undefined) parent[v] = v;
        if (parent[v] !== v) parent[v] = find(parent[v]);
        return parent[v];
    }

    function union(v1, v2) {
        parent[find(v1)] = find(v2);
    }

    const mst = [];
    let totalWeight = 0;

    for (const [weight, u, v] of edges) {
        if (find(u) !== find(v)) {
            union(u, v);
            mst.push([u, v, weight]);
            totalWeight += weight;
        }
    }

    return { mst, totalWeight };
}
const graph = {
    A: { B: 13, C: 3, D: 9, E: 9 },
    B: { A: 13, C: 11, D: 11, E: 13 },
    C: { A: 3, B: 11, D: 9, E: 7 },
    D: { A: 9, B: 11, C: 9, E: 2 },
    E: { A: 9, B: 13, C: 7, D: 2 },
};

const result = findMST(graph);

console.log("Минимальное остовное дерево:");
result.mst.forEach(([u, v, weight]) => {
    console.log(`${u}-${v}: ${weight}`);
});
console.log(`Общий вес: ${result.totalWeight}`);