class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(data) {
        const newNode = new Node(data);

        if(this.root === null) {
            this.root = newNode
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if(newNode.data < node.data) {
            if(node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode)
            }
        } else {
            if(node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode)
            }
        }
    }

    inorder() {
        const result = []
        this.inorderNode(this.root, result)
        return result 
    }

    inorderNode(node, result) {
        if (node !== null) {
            this.inorderNode(node.left, result);
            result.push(node.data)
            this.inorderNode(node.right, result)
        }
    }
}

let tree = new BinarySearchTree()
tree.insert(15)
tree.insert(6)
tree.insert(18)
tree.insert(16)
tree.insert(3)
tree.insert(7)
tree.insert(17)
tree.insert(20)
tree.insert(2)
tree.insert(4)
tree.insert(13)
tree.insert(9)


console.log('tree', tree.inorder())