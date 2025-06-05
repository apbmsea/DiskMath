const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const WIDTH = 20;
const HEIGHT = 20;

let maze = [];
let visitOrder = [];
let path = [];

function generateMazeDFS(w, h) {
  const maze = Array.from({ length: h }, () =>
    Array.from({ length: w }, () => ({ visited: false, top: true, right: true, bottom: true, left: true }))
  );

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  function dfs(x, y) {
    maze[y][x].visited = true;
    const dirs = ['top', 'right', 'bottom', 'left'];
    shuffle(dirs);

    for (const dir of dirs) {
      let nx = x, ny = y;
      if (dir === 'top') ny--;
      else if (dir === 'right') nx++;
      else if (dir === 'bottom') ny++;
      else if (dir === 'left') nx--;

      if (ny >= 0 && ny < h && nx >= 0 && nx < w && !maze[ny][nx].visited) {
        if (dir === 'top') {
          maze[y][x].top = false;
          maze[ny][nx].bottom = false;
        } else if (dir === 'right') {
          maze[y][x].right = false;
          maze[ny][nx].left = false;
        } else if (dir === 'bottom') {
          maze[y][x].bottom = false;
          maze[ny][nx].top = false;
        } else if (dir === 'left') {
          maze[y][x].left = false;
          maze[ny][nx].right = false;
        }
        dfs(nx, ny);
      }
    }
  }

  dfs(0, 0);
  return maze;
}

function bfs(startX, startY, endX, endY) {
  const visited = Array.from({ length: HEIGHT }, () => Array(WIDTH).fill(false));
  const prev = Array.from({ length: HEIGHT }, () => Array(WIDTH).fill(null));
  visitOrder = [];

  const queue = [[startX, startY]];
  visited[startY][startX] = true;

  while (queue.length > 0) {
    const [x, y] = queue.shift();
    visitOrder.push([x, y]);

    if (x === endX && y === endY) break;

    const directions = [
      [0, -1, 'top'],
      [1, 0, 'right'],
      [0, 1, 'bottom'],
      [-1, 0, 'left'],
    ];

    for (const [dx, dy, dir] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < WIDTH &&
        ny < HEIGHT &&
        !visited[ny][nx] &&
        !maze[y][x][dir]
      ) {
        visited[ny][nx] = true;
        prev[ny][nx] = [x, y];
        queue.push([nx, ny]);
      }
    }
  }

  const path = [];
  let curr = [endX, endY];
  while (curr) {
    path.push(curr);
    curr = prev[curr[1]][curr[0]];
  }
  return path.reverse();
}

app.get('/generate', (req, res) => {
  maze = generateMazeDFS(WIDTH, HEIGHT);
  res.json({ maze });
});

app.get('/solve', (req, res) => {
  path = bfs(0, 0, WIDTH - 1, HEIGHT - 1);
  res.json({ visitOrder, path });
});

app.listen(3000, () => console.log('Server on http://localhost:3000'));