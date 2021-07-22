class Stack {
  constructor() {
    this.data = [];
  }

  peek() {
    return this.data[this.data.length - 1];
  }

  push(item) {
    if (item) {
      this.data.push(item);
      return this.data.length;
    } else {
      return undefined;
    }
  }

  pop() {
    let deletedItem = this.data.pop();
    return deletedItem;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(value) {
    this.head = {
      value,
      next: null,
    };

    this.tail = this.head;
    this.length = 1;
  }

  append(value) {
    const newNode = new Node(value);

    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
  }

  prepend(value) {
    const newHeadNode = new Node(value);

    newHeadNode.next = this.head;
    this.head = newHeadNode;
    this.length++;
  }

  printList() {
    let array = [];
    let currentNode = this.head;

    while (currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }

    console.log(array);
  }

  //inserts a node in the linked list
  insert(index, value) {
    //check params
    if (typeof index === 'number' && index >= 0) {
      if (index > this.length - 1) {
        this.append(value);
      } else if (index === 0) {
        this.prepend(value);
      } else {
        const newNode = new Node(value);

        const leader = this.traverseToIndex(index - 1);
        const holdingPointer = leader.next;

        leader.next = newNode;
        newNode.next = holdingPointer;

        this.length++;
      }
    } else {
      console.error('INDICE INVALIDO');
    }
  }

  remove(index) {
    if (index >= 0 && index < this.length) {
      const leader = this.traverseToIndex(index - 1);
      let unwantedNode = leader.next;

      leader.next = unwantedNode.next;

      this.length--;
    } else {
      console.error('INDICE INVALIDO');
    }
  }

  //returns the item at the index position
  traverseToIndex(index) {
    let counter = 0;
    let currentNode = this.head;

    while (counter !== index) {
      currentNode = currentNode.next;
      counter++;
    }

    return currentNode;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  peek() {
    return this.first;
  }

  enqueue(item) {
    const newNode = new Node(item);

    if (this.isEmpty()) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }

    this.length++;

    return this;
  }

  dequeue() {
    let deletedItem = this.first;

    if (this.isEmpty()) return null;
    else {
      if (this.first === this.last) {
        this.last = null;
      }
      this.first = this.first.next;
      this.length--;

      return deletedItem;
    }
  }

  isEmpty() {
    return this.length === 0;
  }
}

class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new BSTNode(value);

    if (!this.root) {
      this.root = newNode;
    } else {
      let currentNode = this.root;

      while (true) {
        if (currentNode.value === value) {
          return console.error('Duplicated Node');
        } else if (value < currentNode.value) {
          if (currentNode.left) currentNode = currentNode.left;
          else {
            currentNode.left = newNode;
            break;
          }
        } else if (value > currentNode.value) {
          if (currentNode.right) currentNode = currentNode.right;
          else {
            currentNode.right = newNode;
            break;
          }
        }
      }
    }

    return 'Inserted ' + value;
  }

  lookup(value) {
    if (!this.root) {
      return null;
    } else {
      let currentNode = this.root;

      while (true) {
        if (currentNode.value > value && currentNode.left) {
          currentNode = currentNode.left;
        } else if (currentNode.value < value && currentNode.right) {
          currentNode = currentNode.right;
        } else if (currentNode.value === value) {
          return console.log(JSON.stringify(currentNode, null, 4));
        } else {
          return console.log('Not found');
        }
      }
    }
  }

  remove(value) {
    if (!this.root) {
      return console.log('Empty tree');
    } else {
      let currentNode = this.root;
      let parent = this.root;
      let side = null;
      let removed = false;

      while (!removed) {
        //recorre el arbol buscando el nodo a borrar
        if (currentNode.value > value && currentNode.left) {
          parent = currentNode;
          currentNode = currentNode.left;
          side = 'left';
        } else if (currentNode.value < value && currentNode.right) {
          parent = currentNode;
          currentNode = currentNode.right;
          side = 'right';
        }

        //remove cases
        if (currentNode.value === value) {
          if (this.doesntHaveChilds(currentNode)) {
            this.deleteLeafNode(currentNode, parent, side);
          } else if (this.hasOneChild(currentNode)) {
            this.deleteNodeWithOneChild(currentNode, parent, side);
          } else if (this.hasBothChilds(currentNode)) {
            let { minimumNode, parent, side } =
              this.findMinimumInRightSubTree(currentNode);
            currentNode.value = minimumNode.value;

            if (this.hasOneChild(minimumNode))
              this.deleteNodeWithOneChild(minimumNode, parent, side);
            else this.deleteLeafNode(minimumNode, parent, side);
          }

          removed = true;
        }
      }
    }
  }

  //condiciones de borrado
  doesntHaveChilds = (currentNode) => !currentNode.left && !currentNode.right;

  hasOneChild = (currentNode) =>
    (!currentNode.left && currentNode.right) ||
    (currentNode.left && !currentNode.right);

  hasBothChilds = (currentNode) => currentNode.right && currentNode.left;

  //metodos de borrado
  deleteLeafNode = (currentNode, parent, side) => {
    if (currentNode != this.root) {
      parent[side] = null;
    } else {
      this.root = null;
    }
  };

  deleteNodeWithOneChild = (currentNode, parent, side) => {
    let parentPointerDirection = side;
    let currentNodeChildDirection = !currentNode.left ? 'right' : 'left';

    parent[parentPointerDirection] = currentNode[currentNodeChildDirection];
  };

  findMinimumInRightSubTree = (currentNode) => {
    let minimumNode = null;
    let found = false;
    let parent = currentNode;
    let side = 'right';
    currentNode = currentNode.right;

    while (!found) {
      if (!currentNode.left) {
        minimumNode = currentNode;
        found = true;
      } else {
        parent = currentNode;
        side = 'left';
        currentNode = currentNode.left;
      }
    }

    return { minimumNode, side, parent };
  };

  print() {
    console.log(JSON.stringify(this.root, null, 4));
  }
}

export { Stack, Queue, LinkedList, BinarySearchTree };
