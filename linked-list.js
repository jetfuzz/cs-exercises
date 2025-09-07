export default LinkedList;

class LinkedList {
    constructor() {
        this.head = null
        this.tail = null
        this.size = 0;
    }

    //add new node to end of the list 
    append(key, value) {
        let node = new Node(key, value);
        this.size++;
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.nextNode = node;
            this.tail = node;
        }
    }

    //prepends new node to start of the list
    prepend(key, value) {
        let node = new Node(key, value);
        this.size++;
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            node.nextNode = this.head;
            this.head = node;
        }
    }

    getSize() {
        return this.size;
    }

    getHead() {
        return this.head;
    }

    getTail() {
        return this.tail;
    }

    at(index) {
        let pointer = 0;
        let currentNode = this.head;
        if (index < 0 || currentNode === null) {
            throw new Error("error: invalid index");
        } 
        while (index != pointer) {
            pointer++;
            currentNode = currentNode.nextNode;
        }
        return currentNode;
    }

    getValueAt(index) {
        let pointer = 0;
        let currentNode = this.head;

        if (index < 0 || currentNode === null) {
            throw new Error("error: invalid index");
        } 
        while (index != pointer) {
            pointer++;
            currentNode = currentNode.nextNode;
        }
        return currentNode.value;
    }

    getKeyAt(index) {
        let pointer = 0;
        let currentNode = this.head;

        if (index < 0 || currentNode === null) {
            throw new Error("error: invalid index");
        } 
        while (index != pointer) {
            pointer++;
            currentNode = currentNode.nextNode;
        }
        return currentNode.key;
    }

    pop() {
        if (this.size > 1) {
            this.size--;
        }
        else if (this.size === 1) {
            this.head = null;
            this.tail = null;
            this.size--;
            return
        } else {
            throw new Error("error, nothing to remove");
        }

        let pointer = 1;
        let currentNode = this.head;

        while (this.size != pointer) {
            pointer++;
            currentNode = currentNode.nextNode;
        }
        this.tail = currentNode;
        this.tail.nextNode = null;
    }

    containsValue(value) {
        let currentNode = this.head;
        let currentNodeValue = currentNode.value;
        
        while (currentNodeValue != value) {
            if (currentNode.nextNode === null) {
                return false;
            }
            currentNode = currentNode.nextNode;
            currentNodeValue = currentNode.value;
        }

        if (currentNodeValue === value) {
            return true;
        } else {
            return false;
        }
    }

    containsKey(key) {
        let currentNode = this.head;
        let currentNodeKey;

        if (currentNode !== null) {
            currentNodeKey = currentNode.key;
        } else {
            return false;
        }
        
        while (currentNodeKey != key) {
            if (currentNode.nextNode === null) {
                return false;
            }
            currentNode = currentNode.nextNode;
            currentNodeKey = currentNode.key;
        }

        if (currentNodeKey === key) {
            return true;
        } else {
            return false;
        }

    }

    findValue(value) {
        let currentNode = this.head;
        let currentNodeValue = currentNode.value;
        let pointer = 0;

        while (currentNodeValue != value) {
            if (currentNode.nextNode === null) {
                return null;
            }
            currentNode = currentNode.nextNode;
            currentNodeValue = currentNode.value;
            pointer++;
        }

        if (currentNodeValue === value) {
            return pointer;
        } else {
            return null;
        }
    }

    findKey(key) {
        let currentNode = this.head;
        let currentNodeKey = currentNode.key;
        let pointer = 0;

        while (currentNodeKey != key) {
            if (currentNode.nextNode === null) {
                return null;
            }
            currentNode = currentNode.nextNode;
            currentNodeKey = currentNode.key;
            pointer++;
        }

        if (currentNodeKey === key) {
            return pointer;
        } else {
            return null;
        }
    }

    toString() {
        let currentNode = this.head;
        if (currentNode === null) {
            return "null";
        }
        let currentNodeValue = currentNode.value;
        let returnString = `( ${currentNodeValue} )`;

        while (currentNode.nextNode !== null) {
            currentNode = currentNode.nextNode;
            currentNodeValue = currentNode.value;
            returnString += ` -> ( ${currentNodeValue} )`;
        }

        returnString += ` -> null`;
        return returnString;
    }

    insertAt(key, value, index) {
        let node = new Node(key, value);
        let pointer = 0;
        let currentNode = this.head;

        if (index === 0) {
            this.prepend(key, value);
            return;
        }

        let nodeAfterCurrent = currentNode.nextNode;

        if (this.size === index) {
            this.append(key, value);
            return;
        } else if (index < 0 || index > this.size) {
            throw new Error("invalid insertion index");
        }

        while (pointer < index) {
            currentNode = currentNode.nextNode;
            nodeAfterCurrent = currentNode.nextNode;
            if (pointer === index - 1) { 
                nodeAfterCurrent = currentNode.nextNode;    
                currentNode.nextNode = node;
                node.nextNode = nodeAfterCurrent;
                this.size++;
                return;
            }
            pointer++;
        }
    }

    removeAt(index) {
        let pointer = 0;
        let currentNode = this.head;
        let nodeAfterDeletedNode;

        if ( currentNode.nextNode !== null) {
            if (currentNode.nextNode.nextNode !== null) {
                nodeAfterDeletedNode = currentNode.nextNode.nextNode;
            }
        } 


        if (index === this.size) {
            this.pop();
            return;
        } else if (index === 0) {
            if (this.size === 1) {
                this.pop();
                return;
            } else {
                this.head = this.head.nextNode
                this.size--;
            }
        } else if (index < 0 || index > this.size) {
            throw new Error("invalid deletion index");
        }

        while (pointer != index) {
             if (pointer === index - 1) { 
                currentNode.nextNode = nodeAfterDeletedNode
                this.size--;
                return;
            }
            currentNode = currentNode.nextNode;
            nodeAfterDeletedNode = nodeAfterDeletedNode.nextNode;
            pointer++;
        }
    }
}

class Node {
    constructor(key = null, value = null, nextNode = null) {
        this.key = key;
        this.value = value;
        this.nextNode = nextNode;
    }
}