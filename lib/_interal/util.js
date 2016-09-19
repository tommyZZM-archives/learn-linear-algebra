/**
 * Created by tommyZZM.OSX on 16/9/16.
 */
"use strict";
const R = require("ramda");
const Rf = require("../../packages/ramdaf")

exports.zipWithSum = Rf.zipWith((a, b) => a + b, 0);
exports.zipWithMutiply = Rf.zipWith((a, b) => a*b, 1);

exports.maybeZero = function maybeZero(value) {
    return value===-0?0:value
}
