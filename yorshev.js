function warshallAlgorithm(matrix) {
  const n = matrix.length;
  const W = matrix.map((row) => [...row]);

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        W[i][j] = W[i][j] || (W[i][k] && W[k][j]);
      }
    }
  }

  return W;
}

const adjacencyMatrix = [
  [0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [1, 0, 0, 1, 0],
  [0, 0, 0, 0, 0],
  [1, 0, 1, 0, 0],
];

function warshallAlgorithmSecond(matrix) {
  const n = matrix.length;
  let W = matrix.map((row) => [...row]);

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      if (W[i][k] === 1) {
        for (let j = 0; j < n; j++) {
          W[i][j] = W[i][j] || W[k][j];
        }
      }
    }
  }

  return W;
}

function printMatrix(matrix) {
  for (const row of matrix) {
    console.log(row.map((cell) => (cell ? "1" : "0")).join(" "));
  }
}

const reachabilityMatrix = warshallAlgorithm(adjacencyMatrix);
printMatrix(reachabilityMatrix);

const result = warshallAlgorithmSecond(adjacencyMatrix);
printMatrix(result);
