'use strict';

document.addEventListener('DOMContentLoaded', () => {
  console.time('Создание префиксного дерева');
  const trie = new Trie(streets);
  console.timeEnd('Создание префиксного дерева');

  const input = document.getElementById('input');
  const suggest = document.getElementById('suggest');
  const methodTrie = document.getElementById('methodTrie');

  input.addEventListener('input', e => {

    const startTime = window.performance.now();
    const foundItems = methodTrie.checked ?
      trie.find(e.target.value) :
      naiveFind(streets, e.target.value);
    const elapsedTime = window.performance.now() - startTime;

    let html = `<p>Время: ${elapsedTime} ms</p>\n`;

    foundItems.forEach(item => {
      html += `<li>${item}</li>\n`;
    });

    suggest.innerHTML = html;
  });

  document.querySelectorAll('input[name=method]').forEach(el => {
    el.addEventListener('click', e => {
      input.value = '';
      suggest.innerHTML = '';
      input.focus();
    });
  });
});
