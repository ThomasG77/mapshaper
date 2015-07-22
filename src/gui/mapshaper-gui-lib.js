/* @requires
mapshaper-gui-utils
mapshaper-common
mapshaper-file-types
mapshaper-gui-error
*/

var gui = api.gui = {};

api.enableLogging();

error = function() { // replace default error() function
  stop.apply(null, utils.toArray(arguments));
};

// Show a popup error message, then throw an error
function stop() {
  var msg = gui.formatMessageArgs(arguments);
  gui.alert(msg);
  throw new Error(msg);
}

gui.browserIsSupported = function() {
  return typeof ArrayBuffer != 'undefined' &&
      typeof Blob != 'undefined' && typeof File != 'undefined';
};

gui.formatMessageArgs = function(args) {
  // remove cli annotation (if present)
  return MapShaper.formatLogArgs(args).replace(/^\[[^\]]+\] ?/, '');
};

gui.handleDirectEvent = function(cb) {
  return function(e) {
    if (e.target == this) cb();
  };
};