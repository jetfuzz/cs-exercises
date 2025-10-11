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

    buildTree(array, start = 0, end = array.length - 1) {
        //sort array and remove duplicate values
        let arr = [...new Set(array.sort((a, b) => a - b))];

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

      while (true) {
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

    deleteItem(value, root = this.root) {
      if (root === null) {
        return this.root;
      }

      if (root.data > value) {
        root.left = this.deleteItem(value, root.left);
      } else if (root.data < value) {
        root.right = this.deleteItem(value, root.right);
      } 
      //found node has zero or one child
      else {
        if (root.left === null) {
          return root.right;
        }
        if (root.right === null) {
          return root.left;
        }
        //node has two children
        let succ = this.getSuccessor(root);
        root.data = succ.data;
        root.right = this.deleteItem(succ.data, root.right);
      }
      return root;
    }

    getSuccessor(curr) {
      curr = curr.right;
      while (curr !== null && curr.left !== null) {
        curr = curr.left;
      }
      return curr;
    }

    find(value) {
      let currNode = this.root;

      while(true) {
        if (value < currNode.data) {
          currNode = currNode.left
        } else if (value > currNode.data) {
          currNode = currNode.right
        } else if (value === currNode.data) {
          return currNode;
        }
      }
    }
}



let myArr = [50, 30, 20, 40, 32, 34, 36, 70, 60, 80, 65, 75, 85]
let myTree = new Tree(myArr);


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