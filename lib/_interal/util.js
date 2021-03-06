/**
 * Created by tommyZZM.OSX on 16/9/16.
 */
"use strict";
const R = require("ramda");
const Rf = require("../../packages/ramdaf")

let equalsZero = R.anyPass([R.equals(0),R.equals(-0)]);
let sum = (a, b) => a + b;

exports.zipWithSum = Rf.zipWith(sum, 0);
exports.zipWithMutiply = Rf.zipWith((a, b) => a*b, 1);
exports.reduceSum = R.reduce(sum, 0)

exports.equalsZero = equalsZero;

exports.maybeZero = function maybeZero(value) {
    return equalsZero(value)?0:value
}
