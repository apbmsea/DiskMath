const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let tree = [];
let path = [];

const generateRandomTree = (size) => {
    const nodes = Array.from({ length: size }, () => Math.floor(Math.random() * 100));
    return buildTree(nodes);
};

const buildTree = (values) => {
    if (values.length === 0) return null;
    const node = { value: values[0], left: null, right: null };
    for (let i = 1; i < values.length; i++) {
        insertNode(node, values[i]);
    }
    return node;
};

const insertNode = (node, value) => {
    if (value < node.value) {
        if (node.left) {
            insertNode(node.left, value);
        } else {
            node.left = { value, left: null, right: null };
        }
    } else {
        if (node.right) {
            insertNode(node.right, value);
        } else {
            node.right = { value, left: null, right: null };
        }
    }
};

app.get('/generate-tree', (req, res) => {
    tree = generateRandomTree(15);
    path = [];
    res.json(tree);
});

app.post('/search', (req, res) => {
    const { value } = req.body;
    path = [];
    const found = searchTree(tree, value);
    res.json({ found, path });
});

const searchTree = (node, value) => {
    if (!node) return false;
    path.push(node.value);
    if (node.value === value) return true;
    if (value < node.value) {
        return searchTree(node.left, value);
    } else {
        return searchTree(node.right, value);
    }
};

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});