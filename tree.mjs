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
        if (curr === null) return;

        if (value === curr.data) {
            curr.data = findNextValue
            return;
        }

        const checkSmaller = value < curr.data;
        let next = checkSmaller ? curr.left:curr.right;
        if (next === null) return;

        if (next.data === value) {
            // Leaf node
            if (next.left === null && next.right === null) {
                if (checkSmaller) {
                    curr.left = null;
                } else {
                    curr.right = null;
                }
            }
            // Both children node
            else if (next.left !== null && next.right !== null) {
                return;
            }
            // One child
            else {
                if (checkSmaller) {
                    curr.left = (next.left === null) ? next.right:next.left;
                } else {
                    curr.right = (next.left === null) ? next.right:next.left;
                }
            }
        } else {
            console.log(`proceeding to ${next.data}`);
            this.deleteItem(value, next);
        }
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

let testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let check = new Tree(testArr);
check.insert(2)
check.insert(22)
check.deleteItem(324);
check.prettyPrint()