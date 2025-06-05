function dikstera(graph, startNode) {

    const distances = {};
    const visited = {};
    const previous = {};
    const queue = new PriorityQueue();

    for (const node in graph) {
        distances[node] = node === startNode ? 0 : Infinity;
        previous[node] = null;
        queue.enqueue(node, distances[node]);
    }

    while (!queue.isEmpty()) {

        const currentNode = queue.dequeue().element;
    
        visited[currentNode] = true;

        for (const neighbor in graph[currentNode]) {
  
            if (visited[neighbor]) continue;
    
            const distance = distances[currentNode] + graph[currentNode][neighbor];
    
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                previous[neighbor] = currentNode;
                queue.changePriority(neighbor, distance);
            }
        }
    }
      
    console.log('Стоимость:', distances['Пианино']);

    return {
        distances,
        previous
    };
}

class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(element, priority) {
        this.items.push({element, priority});
        this.sort();
    }

    dequeue() {
        return this.items.shift();
    }

    isEmpty() {
    return this.items.length === 0;
    }

    changePriority(element, newPriority) {
        const index = this.items.findIndex(item => item.element === element);
        if (index !== -1) {
         this.items[index].priority = newPriority;
            this.sort();
        }
    }

    sort() {
        this.items.sort((a, b) => a.priority - b.priority);
    }
}

function getPath(previous, endNode) {
    const path = [];
    let current = endNode;
    
    while (current !== null) {
      path.unshift(current);
      current = previous[current];
    }
    
    return path;
}

const graph = {
    'Книга': { 'Пластинка': 5, 'Постер': 0 },
    'Пластинка': { 'Книга': 5, 'Гитара': 15, 'Барабан': 20 },
    'Постер': { 'Книга': 0, 'Гитара': 30, 'Барабан': 35 },
    'Гитара': { 'Пластинка': 15, 'Постер': 30, 'Пианино': 20 },
    'Барабан': { 'Пластинка': 20,'Постер': 35, 'Пианино': 10 },
    'Пианино': { 'Гитара': 20, 'Барабан': 10 }
};
  
const result = dikstera(graph, 'Книга');

function getPath(previous, endNode) {
  const path = [];
  let current = endNode;
  
  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }
  
  return path;
}

console.log('Путь до Пианино:', getPath(result.previous, 'Пианино'));