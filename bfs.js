function bfs(start, target, graph) {
  const queue = [[start]];
  const visited = new Set();

  while (queue.length > 0) {
    const path = queue.shift();
    const node = path[path.length - 1];

    if (node === target) {
      return path;
    }

    if (!visited.has(node)) {
      visited.add(node);

      for (const neighbor of graph[node]) {
        const newPath = [...path, neighbor];
        queue.push(newPath);
      }
    }
  }

  return null;
}

const graph = {
  0: [1, 2],
  1: [3],
  2: [4, 5],
  3: [6],
  4: [7, 8],
  5: [9],
  6: [10],
  7: [11],
  8: [12],
  9: [13],
  10: [],
  11: [],
  12: [],
  13: [],
};

console.log("Путь:", bfs(0, 10, graph));