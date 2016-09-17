/**
 * Created by tommyZZM.OSX on 16/9/16.
 */
"use strict";

const R = require("ramda")

module.exports = R.curryN(3,assocPathCompatible)

function assocPathCompatible(path, val, obj) {
    switch (path.length) {
        case 0:
            return val;
        case 1:
            return _assoc(path[0], val, obj);
        default:
            return _assoc(path[0], assocPathCompatible(_slice(path, 1), val, Object(obj[path[0]])), obj);
    }
}

function _assoc(prop, val, obj) {
    var result = R.isArrayLike(obj)?[]:{};
    for (var p in obj) {
        result[p] = obj[p];
    }
    result[prop] = val;
    return result;
}
