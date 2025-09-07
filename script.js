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
  get(key){
    const hashedKey = this.hash(key)
    if(hashedKey in this.buckets){
        const totalNodes = this.buckets[hashedKey].totalNodes
        if(totalNodes === 1){
            return this.buckets[hashedKey].head.value
        }
        let currentNode = this.buckets[hashedKey].head
        for(let i = 0; i < totalNodes; i++){
            if(currentNode.key === key){
                return currentNode.value
            }
            currentNode = currentNode.nextNode
        }
    }
    return null
  }
}
let a = new HashMap();
// a.set("Sara", "Hiii")
// a.set("raSa", "Hello")
let v = a.get("Sara")
console.log(v)
// console.log(a)
