var EventEmitter = require('./lib/events').EventEmitter,
    cache = require('./lib/busytime_cache');

var dayManager = new EventEmitter();

var store;
Object.defineProperty(dayManager, 'store', {
  set: function(value) {
    value.on('add', add);
    value.on('update', update);
    value.on('remove', remove);
    store = value;
  }
});

dayManager.on('newListener', function(event) {
  if (!(cache.contains(event))) {
    store.get('busytimes', event).then(function(busytimes) {
      busytimes.forEach(add);
    });
  }
});

dayManager.on('removeListener', function(event, listener) {
  if (dayManager.listeners(event).length === 0) {
    cache.purge(event);
  }
});

function add(busytime) {
  var days = cache.put(busytime);
  reload(days);
}

function update(old, updated) {
  var oldDays = cache.remove(old),
      updatedDays = cache.put(updated);
  reload(intersection(oldDays, updatedDays));
}

function remove(busytime) {
  var days = cache.remove(busytime);
  reload(days);
}

function intersection(/*array1, array2, ..., arrayN*/) {
  // TODO
}

function reload(days) {
  days.forEach(function(day) {
    dayManager.emit('reload', cache.get(day));
  });
}

module.exports = dayManager;
