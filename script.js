import { LinkedList } from "./helper.js";

class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.buckets = new Array(initialCapacity);
    this.size = 0;
    this.capacity = initialCapacity;
    this.loadFactor = loadFactor;
  }
  // Hash the key
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }
    return hashCode;
  }
  // Add an item(key:value) in the hash map
  set(key, value) {
    const hashedKey = this.hash(key);
    if (!this.buckets[hashedKey]) {
      this.buckets[hashedKey] = new LinkedList();
      this.buckets[hashedKey].insert(key, value);
    } else {
      this.buckets[hashedKey].insert(key, value);
    }
  }
  // Returns the value that is assigned to the given key. If a key is not found, returns null
  get(key) {
    const hashedKey = this.hash(key);
    if (hashedKey in this.buckets) {
      const totalNodes = this.buckets[hashedKey].totalNodes;
      if (totalNodes === 1) {
        return this.buckets[hashedKey].head.value;
      }
      let currentNode = this.buckets[hashedKey].head;
      for (let i = 0; i < totalNodes; i++) {
        if (currentNode.key === key) {
          return currentNode.value;
        }
        currentNode = currentNode.nextNode;
      }
    }
    return null;
  }
  // Returns true or false based on whether or not the given key is in the hash map
  has(key) {
    const hashedKey = this.hash(key);
    if (hashedKey in this.buckets) {
      const totalNodes = this.buckets[hashedKey].totalNodes;
      if (totalNodes === 1 && this.buckets[hashedKey].head.key === key) {
        return true;
      }
      let currentNode = this.buckets[hashedKey].head;
      for (let i = 0; i < totalNodes; i++) {
        if (currentNode.key === key) {
          return true;
        }
        currentNode = currentNode.nextNode
      }
    }
    return false;
  }
  // Remove the entry with the given key and return true. If the key isn’t in the hash map,return false
  remove(key) {
    const hashedKey = this.hash(key);
    const bucket = this.buckets[hashedKey];
    if (!bucket || bucket.totalNodes === 0) return false;

    let removed = false;

    // Special case: only one node
    if (bucket.totalNodes === 1 && bucket.head.key === key) {
      delete this.buckets[hashedKey];
      return true;
    }

    let currentNode = bucket.head;
    let prevNode = null;

    for (let i = 0; i < bucket.totalNodes; i++) {
      if (i === 0 && currentNode.key === key) {
        bucket.head = currentNode.nextNode;
        if (currentNode.nextNode === null) bucket.tail = null;
        removed = true;
        break;
      }
      if (currentNode.nextNode && currentNode.nextNode.key === key) {
        prevNode = currentNode;
        prevNode.nextNode = currentNode.nextNode.nextNode;
        if (prevNode.nextNode === null) bucket.tail = prevNode;
        removed = true;
        break;
      }
      currentNode = currentNode.nextNode;
    }

    if (removed) {
      bucket.totalNodes--;
      return true;
    }
    return false;
  }
  // Returns the number of keys stored in the hashmap
  length(){
    let totalKeys = 0
    this.buckets.forEach(bucket =>{
      if(typeof bucket === "object"){
        let currentNode = bucket.head
        for(let i = 0; i < bucket.totalNodes; i++){
          totalKeys++
          currentNode = currentNode.nextNode
        }
      }
    })
    return totalKeys
  }
  // Removes all entries in the hash map
  clear(){
    this.buckets = new Array(this.capacity)
    this.size = 0
  }
  // Returns an array containing all the keys inside the hash map
  keys(){
    let keysArr = []
    this.buckets.forEach(bucket =>{
      if(typeof bucket === "object"){
        let currentNode = bucket.head
        for(let i = 0; i < bucket.totalNodes; i++){
          keysArr.push(currentNode.key)
          currentNode = currentNode.nextNode
        }
      }
    })
    return keysArr
  }
  // Returns an array containing all the values
  values(){
    let valuesArr = []
    this.buckets.forEach(bucket =>{
      if(typeof bucket === "object"){
        let currentNode = bucket.head
        for(let i = 0; i < bucket.totalNodes; i++){
          valuesArr.push(currentNode.value)
          currentNode = currentNode.nextNode
        }
      }
    })
    return valuesArr
  }
  // Returns an array containing all [key, value] pairs in hashmap
  entries(){
    const entriesArr = []
    this.buckets.forEach(bucket =>{
      if(typeof bucket === "object"){
        let currentNode = bucket.head
        for(let i = 0; i < bucket.totalNodes; i++){
          entriesArr.push([currentNode.key, currentNode.value])
          currentNode = currentNode.nextNode
        }
      }
    }) 
    return entriesArr
  }
}
let a = new HashMap()
a.set("AAa", "1");
a.set("aAa", "a1");
a.set("hello", "2");
a.set("world", "3");
a.set("foo", "4");
a.set("bar", "5");
console.log(a.has("aAa"))
