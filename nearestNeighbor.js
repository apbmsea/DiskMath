function nearestNeighbor(graph, start) {
    const n = Object.keys(graph).length;
    const visited = new Set();
    let path = [start];
    let totalWeight = 0;
    let current = start;

    visited.add(current);

    while (visited.size < n) {
        let nearest = null;
        let minDist = Infinity;

        for (const neighbor in graph[current]) {
            if (!visited.has(neighbor) && graph[current][neighbor] < minDist) {
                minDist = graph[current][neighbor];
                nearest = neighbor;
            }
        }

        if (nearest !== null) {
            path.push(nearest);
            totalWeight += minDist;
            visited.add(nearest);
            current = nearest;
        }
    }

    totalWeight += graph[current][start];
    path.push(start);

    return { path, totalWeight };
}

// Пример из задачи
const graph = { //указать здесь матрицу смежности
    A: { B: 5, C: 8, D: 6 },
    B: { A: 5, C: 7, D: 10 },
    C: { A: 8, B: 7, D: 3 },
    D: { A: 6, B: 10, C: 3 }
};

const start = 'D'; //начальная точка

// // Пример 2
// const graph = {
//     X: { Y: 5, Z: 9, W: 3 },
//     Y: { X: 5, Z: 2, W: 7 },
//     Z: { X: 9, Y: 2, W: 4 },
//     W: { X: 3, Y: 7, Z: 4 }
// }
// const start = 'X'

const result = nearestNeighbor(graph, start);

console.log("Путь:", result.path.join(" → "));
console.log("Общий вес:", result.totalWeight);
