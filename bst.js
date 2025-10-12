class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(arr) {
        this.arr = this.sortAndDedupeArray(arr);
        this.root = this.buildTree(this.arr);
    }

    buildTree(array, start = 0, end = array.length - 1) {
      if (start > end) return null;

      let mid = Math.floor((start + end) / 2);
      let root = new Node(array[mid]);

      root.left = this.buildTree(array, start, mid - 1);
      root.right = this.buildTree(array, mid + 1, end);

      return root;
    }

    sortAndDedupeArray(arr) {
      let newArr = [...new Set(arr.sort((a, b) => a - b))];
      return newArr;
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
      else {
        if (root.left === null) {
          return root.right;
        }
        if (root.right === null) {
          return root.left;
        }

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
        if (currNode === null) return null;
        if (value < currNode.data) {
          currNode = currNode.left
        } else if (value > currNode.data) {
          currNode = currNode.right
        } else if (value === currNode.data) {
          return currNode;
        }
      }
    }

    levelOrderForEach(callback) {
      if (typeof callback !== "function") {
        throw new Error("Callback function is required");
      }

      let node = this.root;
      let queue = [node];

      while (queue.length !== 0) {
        node = queue.shift();
        callback(node);
        if (node.left !== null) {
          queue.push(node.left);
        }
        if (node.right !== null) {
          queue.push(node.right);
        }
      }
    }

    inOrderForEach(callback, root = this.root) {
      if (typeof callback !== "function") {
        throw new Error("Callback function is required");
      }

      if (root === null) return;
      this.inOrderForEach(callback, root.left);
      callback(root);
      this.inOrderForEach(callback, root.right);
    }

    preOrderForEach(callback, root = this.root) {
      if (typeof callback !== "function") {
        throw new Error("Callback function is required");
      }

      if (root === null) return;
      callback(root);
      this.preOrderForEach(callback, root.left);
      this.preOrderForEach(callback, root.right);
    }

    postOrderForEach(callback, root = this.root) {
      if (typeof callback !== "function") {
        throw new Error("Callback function is required");
      }

      if (root === null) return;
      this.postOrderForEach(callback, root.left);
      this.postOrderForEach(callback, root.right);
      callback(root);
    }

    height(value) {
      let node = value;
      if (typeof value != "object") {
        node = this.find(value);
        if (node === null) {
          return null;
        }
      };

      if (node === null) return -1;

      return 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    depth(value, root = this.root) {
      let node = value;
      if (typeof value != "object") {
        node = this.find(value);
        if (node === null) {
          return null;
        }
      };

      if (root === null) return -1;

      let dist = -1;

      if (root.data === node.data ||
        (dist =  this.depth(value, root.left)) >= 0 ||
        (dist =  this.depth(value, root.right)) >= 0) {
          return dist + 1;
        }

      return dist;
    }

    isBalanced(root = this.root) {
      if (root === null) return true;

      return this.isBalanced(root.left) && 
      this.isBalanced(root.right) &&
      Math.abs(this.height(root.left) - this.height(root.right)) <= 1;
    }

    rebalance() {
      if (this.isBalanced() === true) return;

      let newArr = [];
      this.inOrderForEach((node) => newArr.push(node.data));
      this.root = this.buildTree(newArr);

    }
}