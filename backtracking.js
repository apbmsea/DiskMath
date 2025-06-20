function backtrackingPath(graph, start, target) {
  const solutions = [];

  function backtrack(current, path) {
    path.push(current);

    if (current === target) {
      solutions.push([...path]);
    } else {
      for (const neighbor of graph[current] || []) {
        if (!path.includes(neighbor)) {
          backtrack(neighbor, path);
        }
      }
    }

    path.pop();
  }

  backtrack(start, []);
  return solutions;
}

const graph = {
  A: ["B", "C"],
  B: ["D", "E"],
  C: ["F"],
  D: ["G"],
  E: ["G"],
  F: ["G"],
  G: [],
};

const paths = backtrackingPath(graph, "A", "G");
paths.forEach((path, index) => {
  console.log(`Путь ${index + 1}: ${path.join(" -> ")}`);
});
