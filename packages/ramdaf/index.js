/**
 * Created by tommyZZM.OSX on 16/9/10.
 */
"use strict";
const R = require("ramda");

const zipWith = R.apply(require("./zipWith"));
const allEqual = require("./allEqual");

const dropLastWhileIsNil = R.dropLastWhile(R.isNil)

exports.zipWith = (fn,init,a,b) => zipWith(dropLastWhileIsNil([fn,init,a,b]));
exports.allEqual = list => allEqual(list);
