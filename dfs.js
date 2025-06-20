function dfsAlgo(graph, start, target) {
  const visited = new Set();

  function dfs(node, path) {
    if (visited.has(node)) return null;

    path.push(node);
    visited.add(node);

    if (node === target) {
      return path;
    }

    for (const neighbor of graph[node]) {
      const result = dfs(neighbor, [...path]);
      if (result) return result;
    }

    return null;
  }

  const path = dfs(start, []);
  if (path) {
    return {
      path,
      length: path.length - 1,
    };
  } else {
    return null;
  }
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

const result = dfsAlgo(graph, 0, 10);

if (result) {
  console.log("Путь:", result.path);
  console.log("Длина пути:", result.length);
} else {
  console.log("Путь не найден");
}
