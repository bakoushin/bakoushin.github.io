'use strict';

class Trie {
  constructor(data, limit = 10) {
    this._data = data;
    this._limit = limit;
    this._DATA_ENTRIES = Symbol('entries');
    this._root = Object.create(null);
    data.forEach((value, index) => this.add(value, index));
  }
  find(word) {
    if (!word) {
      return [];
    }
    let node = this._root;
    for (const letter of word) {
      node = node[letter.toLowerCase()];
      if (!node) {
        return [];
      }
    }
    let result = [];
    for (const dataEntry of node[this._DATA_ENTRIES]) {
      result.push(this._data[dataEntry]);
    }
    return result;
  }
  add(word, dataEntry) {
    for (let i = 1; i <= word.length; i++) {
      this._addPrefix(word.slice(-i), dataEntry);
    }
  }
  _addPrefix(prefix, dataEntry) {
    prefix = prefix.trim();
    let node = this._root;
    for (const letter of prefix) {
      const lowerCasedLetter = letter.toLowerCase();
      const childNode = node[lowerCasedLetter];
      if (childNode) {
        const items = childNode[this._DATA_ENTRIES];
        if (items.size < this._limit) {
          items.add(dataEntry);
        }
        node = childNode;
      } else {
        const newNode = Object.create(null);
        const dataEntries = new Set();
        dataEntries.add(dataEntry);
        newNode[this._DATA_ENTRIES] = dataEntries;
        node[lowerCasedLetter] = newNode;
        node = newNode;
      }
    }
  }
}
