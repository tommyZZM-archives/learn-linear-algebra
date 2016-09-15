/**
 * Created by tommyZZM.OSX on 16/9/15.
 */
"use strict";

const R = require("ramda")

exports.allEqual = list => R.apply(R.allPass(R.equals))(list)
exports.allEqualBy = (...preds) => list => R.apply(R.apply(R.allPass,preds))(list)
