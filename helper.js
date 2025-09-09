class Node {
  key = null;
  value = null;
  nextNode = null;
}

export class LinkedList {
  head = null;
  tail = null;
  totalNodes = 0;

  insert(key, val) {
    if (this.head === null) {
      this.head = new Node();
      this.head.key = key;
      this.head.value = val;
      this.tail = this.head;
      this.totalNodes++;
    } else {
      let currentNode = this.head;
      for (let i = 0; i < this.totalNodes; i++) {
        if (currentNode.key === key) {
          currentNode.value = val;
          return;
        }
        currentNode = currentNode.nextNode;
      }
      currentNode = this.tail;
      currentNode.nextNode = new Node();
      currentNode.nextNode.key = key;
      currentNode.nextNode.value = val;
      this.tail = currentNode.nextNode;
      this.totalNodes++;
    }
  }
  remove(index,key) {
    if (this.head === null) return false;

    if (this.totalNodes === 1) {
      this.head = null;
      this.tail = null;
      this.totalNodes = 0;
      return true;
    }

    if (this.totalNodes === 2) {
      this.head.nextNode = null;
      this.tail = this.head;
      this.totalNodes -= 1;
      return true;
    }

    // let currentNode = this.head;
    // for (let i = 0; i < this.totalNodes; i++) {
    //   if(currentNode.nextNode)
    // }
  }
}
