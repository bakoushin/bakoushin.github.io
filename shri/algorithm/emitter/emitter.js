'use strict';

class Emitter {
  constructor() {
    this._events = Object.create(null);
  }
  // amortized O(1) or 0(log N)
  on(event, handler) {
    let eventHandlers = this._events[event];
    if (!eventHandlers) {
      eventHandlers = new Set();
      this._events[event] = eventHandlers;
    }
    eventHandlers.add(handler);
  }
  // amortized O(1) or 0(log N)
  off(event, handler) {
    this._events[event].delete(handler);
  }
  // O(n) n - size of handlers list
  emit(event) {
    this._events[event].forEach(handler => handler());
  }
}
