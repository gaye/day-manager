var dayToBusytimes = {};

exports.contains = function(day) {
  return day in dayToBusytimes;
};

exports.get = function(day) {
  return dayToBusytimes[day];
};

exports.put = function(busytime) {
  var days = intervalDays(busytime);
  days.forEach(function(day) {
    if (!(day in dayToBusytimes)) {
      dayToBusytimes[day] = [];
    }

    dayToBusytimes[day].push(busytime);
  });

  return days;
};

exports.remove = function(busytime) {
  var days = intervalDays(busytime);
  days.forEach(function(day) {
    removeAll(day, busytime);
  });

  return days;
};

exports.purge = function(day) {
  delete dayToBusytimes[day];
};

function daysInInterval(busytime) {
  // TODO
}

function removeAll(collection, member) {
  // TODO
}
