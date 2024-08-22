// Tie it all together
// Write a driver script that does the following:

// Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it if you wish.
// Confirm that the tree is balanced by calling isBalanced.
// Print out all elements in level, pre, post, and in order.
// Unbalance the tree by adding several numbers > 100.
// Confirm that the tree is unbalanced by calling isBalanced.
// Balance the tree by calling rebalance.
// Confirm that the tree is balanced by calling isBalanced.
// Print out all elements in level, pre, post, and in order.
import Tree from "./tree.mjs";

// Generate input and tree
const inputNumbers = generateRandomNumbers(20);
const myTree = new Tree(inputNumbers);

// Check balance
console.log(`Checking tree is balanced: ${myTree.isBalanced()}`);
console.log('\n');

// Log different traversals
console.log("Level order:")
myTree.levelOrder(printNumber);
console.log('\n');

console.log("In order:")
myTree.inOrder(printNumber);
console.log('\n');

console.log("Pre order:")
myTree.preOrder(printNumber);
console.log('\n');

console.log("Post order:")
myTree.postOrder(printNumber);
console.log('\n');

// Unbalance the tree
myTree.insert(101)
myTree.insert(102)
myTree.insert(103)
myTree.insert(104)
console.log(`Following insertions, is tree balanced? ${myTree.isBalanced()}\n`)

// Rebalance the tree
myTree.rebalance();
console.log(`Following rebalance, is tree balanced? ${myTree.isBalanced()}\n`)

// Log different traversals
console.log("Level order:")
myTree.levelOrder(printNumber);
console.log('\n');

console.log("In order:")
myTree.inOrder(printNumber);
console.log('\n');

console.log("Pre order:")
myTree.preOrder(printNumber);
console.log('\n');

console.log("Post order:")
myTree.postOrder(printNumber);
console.log('\n');

function generateRandomNumbers(length) {
    return Array.from({length}, () => Math.floor(Math.random() * 100));
}

function printNumber(x) {
    process.stdout.write(`${x}, `);
    return x;
}