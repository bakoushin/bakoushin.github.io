'use strict';

function naiveFind(data, word, limit = 10) {
  word = word.toLowerCase();
  return data
    .filter(road => road.toLowerCase().includes(word))
    .filter((value, index) => index < limit);
}
