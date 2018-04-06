'use strict';

function print1() {
  console.log('1');
}

function print2() {
  console.log('2');
}

function print3() {
  console.log('3');
}

function print4() {
  console.log('4');
}

const emitter = new Emitter();

emitter.on('boom', print1);
emitter.on('boom', print2);
emitter.on('boom', print3);
emitter.on('boom', print4);

emitter.on('bang', print4);
emitter.on('bang', print3);
emitter.on('bang', print2);
emitter.on('bang', print1);

document.addEventListener('DOMContentLoaded', () => {

  const start = document.getElementById('start');
  start.addEventListener('click', e => {

    // Boom event

    console.log('Boom!');
    emitter.emit('boom');

    console.log('Remove `2`');
    emitter.off('boom', print2);

    console.log('Boom!');
    emitter.emit('boom');

    // Bang event

    console.log('Bang!');
    emitter.emit('bang');

    console.log('Remove `3`');
    emitter.off('bang', print3);

    console.log('Bang!');
    emitter.emit('bang');

  });

});
