import mergeSort from "./merge-sort.mjs";
import Node from "./node.mjs";

class Tree {

    constructor(array) {
        let uniqueNumbers = [...new Set(array)];
        this.root = this.buildTree(mergeSort(uniqueNumbers));
    }

    buildTree(array) {

        if (array.length === 1) {
            return new Node(array[0]);
        } else if (array.length === 2) {
            return new Node(array[0], null, new Node(array[1]));
        }

        const midpoint = Math.floor(array.length/2);
        const left = this.buildTree(array.slice(0, midpoint));
        const right = this.buildTree(array.slice(midpoint + 1));

        return new Node(array[midpoint], left, right)
    }

    insert(value, curr = this.root) {
        if (value === curr.data) return;
        const checkSmaller = value < curr.data;
        let next = checkSmaller ? curr.left:curr.right;

        if (next === null) {
            next = new Node(value);
            if (checkSmaller) {
                curr.left = next;
            } else {
                curr.right = next;
            }
        } else {
            this.insert(value, next);
        }
    }

    findNextValue(curr) {
        if (curr.right === null) return null;
        curr = curr.right;
        while (curr.left != null) {
            curr = curr.left;
        }
        return curr.data;
    }

    deleteItem(value, curr = this.root) {
        if (curr === null) return curr;

        if (value < curr.data) {
            curr.left = this.deleteItem(value, curr.left);
        } else if (value > curr.data) {
            curr.right = this.deleteItem(value, curr.right);
        } else {

            // One or no children
            if (curr.left === null) {
                return curr.right;
            }

            // One child
            if (curr.right === null) {
                return curr.left;
            }

            // Both children
            let succesor = this.findNextValue(curr);
            curr.data = succesor;
            curr.right = this.deleteItem(succesor, curr.right);
        }

        return curr;
    }

    find(value, node = this.root) {
        if (node === null) return null;
        if (node.data > value) return this.find(value, node.left);
        if (node.data < value) return this.find(value, node.right);
        return node;
    }

    levelOrder(callback) {
        if (!callback) throw new Error('No callback provided');

        const queue = [this.root];
        let node;

        while (queue.length > 0) {
            node = queue.shift();
            // Queue
            if (node != null) {
                node.data = callback(node.data);
                if (node.left !== null) queue.push(node.left);
                if (node.right !== null) queue.push(node.right);
            }
        }
    }

    inOrder(callback, node = this.root) {
        if (!callback) throw new Error('No callback provided');
        if (node !== null) {
            if (node.left !== null) this.inOrder(callback, node.left);
            node.data = callback(node.data);
            if (node.right !== null) this.inOrder(callback, node.right); 
        }
    }

    preOrder(callback, node = this.root) {
        if (!callback) throw new Error('No callback provided');
        if (node !== null) {
            node.data = callback(node.data);
            if (node.left !== null) this.inOrder(callback, node.left);
            if (node.right !== null) this.inOrder(callback, node.right); 
        }
    }

    postOrder(callback, node = this.root) {
        if (!callback) throw new Error('No callback provided');
        if (node !== null) {
            if (node.left !== null) this.inOrder(callback, node.left);
            if (node.right !== null) this.inOrder(callback, node.right); 
            node.data = callback(node.data);
        }
    }

    height(node = this.root) {
        if (node === null) return -1;
        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    depth(node) {
        if (!node) return -1;
        let curr = this.root;
        let counter = 0;

        while (curr !== null) {
            counter++;
            if (curr.data === node.data) return counter;
            if (curr.data < node.data) curr = curr.right;
            if (curr.data > node.data) curr = curr.left;
        }
        return -1;
    }

    isBalanced(node = this.root) {
        if (node === null) return true; // Base case
        if (Math.abs(this.height(node.left) - this.height(node.right)) < 2) {
            return this.isBalanced(node.left) && this.isBalanced(node.right);
        }
        return false;
    }

    rebalance() {
        let arr = [];
        let getArr = x => arr.push(x);
        this.inOrder(getArr);
        this.root = this.buildTree(arr);
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };
}