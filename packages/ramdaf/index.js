/**
 * Created by tommyZZM.OSX on 16/9/10.
 */
"use strict";
const R = require("ramda");

const zipWith = R.apply(require("./zipWith"));

const dropLastWhileIsNil = R.dropLastWhile(R.isNil)

exports.zipWith = (fn,a,b)=>zipWith(dropLastWhileIsNil([fn,a,b]));