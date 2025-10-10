class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(arr) {
        this.arr = arr;
        this.root = this.buildTree(this.arr);
    }

    buildTree(array) {
        //sort array and remove duplicate values
        let arr = [...new Set(array.sort((a, b) => a - b))];

        let start = 0;
        let end = arr.length - 1;

        if (start > end) return null;
        let mid = Math.floor((start + end) / 2);
        let root = new Node(arr[mid]);

        root.left = this.buildTree(arr.slice(start, mid));
        root.right = this.buildTree(arr.slice(mid + 1, arr.length));

        return root;
    }

    insert(value) {
      let newNode = new Node(value);
      let currNode = this.root;

      if (currNode === null) {
        this.root = newNode;
      }

      while (true) {
        //no duplicate values
        if (currNode.data === newNode.data) {
          return
        }

        if (newNode.data < currNode.data) {
          if (currNode.left === null) {
            currNode.left = newNode;
            break;
          } else {
            currNode = currNode.left;
          }
        }
        else if (newNode.data > currNode.data) {
          if (currNode.right === null) {
            currNode.right = newNode;
            break;
          } else {
            currNode = currNode.right;
          }
        }
      }
    }
}



let myArr = [50, 30, 20, 40, 32, 34, 36, 70, 60, 80, 65, 75, 85]
let myTree = new Tree(myArr);

myTree.insert(5)
myTree.insert(31)

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

prettyPrint(myTree.root)