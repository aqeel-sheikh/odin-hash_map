import { LinkedList } from "./helper.js"

class HashMap {

    constructor(initialCapacity = 16, loadFactor = 0.75){
        this.buckets = new Array(initialCapacity)
        this.size = 0
        this.capacity = initialCapacity
        this.loadFactor = loadFactor
    }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }

    return hashCode;
  }
  set(key, value){
    const hashedKey = this.hash(key)
    if(!this.buckets[hashedKey]){
        this.buckets[hashedKey] = new LinkedList()
        this.buckets[hashedKey].insert(key, value) 
    } else {
        this.buckets[hashedKey].insert(key,value)
    }
}
}
let a = new HashMap()

// console.log(a)
