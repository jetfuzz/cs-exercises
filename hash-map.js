import LinkedList from "./linked-list";

class HashMap {

    loadFactor = 0.75;
    capacity = 16;
    buckets = new Array(this.capacity);
    threshold = this.loadFactor * this.capacity;

    #resize() {
        let keys = this.keys();
        let values = this.values();
        let length = this.length();

        this.capacity = this.capacity * 2;
        this.buckets = new Array(this.capacity);
        this.threshold = this.loadFactor * this.capacity;

        for (let i = 0; i < length; i++) {
            this.set(keys[i], values[i]);
        }
    }


    hash(key) { 
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode % this.capacity
    }

    //insert or update an entry within the hash map
    set(key, value) {
        let index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if (typeof this.buckets[index] == "undefined") {
            let list = new LinkedList();
            list.append(key, value);
            this.buckets[index] = list;
        } 

        else {
            if (this.buckets[index].containsKey(key)) {
                let listIndex = this.buckets[index].findKey(key);

                this.buckets[index].removeAt(listIndex);
                this.buckets[index].insertAt(key, value, listIndex);
            } 

            else {
                this.buckets[index].append(key, value);
            }
        }
        if (this.length() > this.threshold) {
            this.#resize();
        }
    }

    //returns the value assigned to a key
    get(key) {
        for (let i = 0; i < this.buckets.length; i++) {
            if (typeof this.buckets[i] !== "undefined") {
                if (this.buckets[i].containsKey(key)) {
                    let listIndex = this.buckets[i].findKey(key);
                    return this.buckets[i].getValueAt(listIndex);
                }
            }
        }
        return null;
    }

    //returns true if given key exists within hash map
    has(key) {
        for (let i = 0; i < this.buckets.length; i++) {
            if (typeof this.buckets[i] !== "undefined") {
                if (this.buckets[i].containsKey(key)) {
                    return true;
                }
            }
        }
        return false;
    }

    //if key exists within hash map, remove and return true
    remove(key) {
        for (let i = 0; i < this.buckets.length; i++) {
            if (typeof this.buckets[i] !== "undefined") {
                if (this.buckets[i].containsKey(key)) {
                    let listIndex = this.buckets[i].findKey(key);
                    this.buckets[i].removeAt(listIndex);
                    return true;
                }
            }
        }
        return false;
    }

    //return the number of keys stored in the hash map
    length() {
        let keyCount = 0;
        for (let i = 0; i < this.buckets.length; i++) {
            if (typeof this.buckets[i] !== "undefined") {
                keyCount += this.buckets[i].getSize();
            }
        }
        return keyCount;
    }

    //remove all entries in the hash map
    clear() {
        for (let i = 0; i < this.buckets.length; i++) {
            if (typeof this.buckets[i] !== "undefined") {
                while(this.buckets[i].size !== 0) {
                    this.buckets[i].pop();
                }
            }
        }
    }

    //returns an array containing all the keys inside the hash map
    keys() {
        let keyArr = [];
        let pointer = 0;
        for (let i = 0; i < this.buckets.length; i++) {
            if (typeof this.buckets[i] !== "undefined") {
            while (pointer < this.buckets[i].getSize()) {
                keyArr.push(this.buckets[i].getKeyAt(pointer));
                pointer++;
            }
            pointer = 0;
            }
        }
        return keyArr;
    }

    //returns an array containing all the values inside the hash map
    values() {
        let valueArr = [];
        let pointer = 0;
        for (let i = 0; i < this.buckets.length; i++) {
            if (typeof this.buckets[i] !== "undefined") {
            while (pointer < this.buckets[i].getSize()) {
                valueArr.push(this.buckets[i].getValueAt(pointer));
                pointer++;
            }
            pointer = 0;
            }
        }
        return valueArr;
    }

    //returns an array that contains each key value pair
    entries() {
        let returnArr = [];
        let keyValue = [];
        let pointer = 0;
        for (let i = 0; i < this.buckets.length; i++) {
            if (typeof this.buckets[i] !== "undefined") {
            while (pointer < this.buckets[i].getSize()) {
                keyValue.push(this.buckets[i].getKeyAt(pointer));
                keyValue.push(this.buckets[i].getValueAt(pointer));
                returnArr.push(keyValue);
                keyValue = [];
                pointer++;
            }
            pointer = 0;
            }
        }
        return returnArr;
    }
}