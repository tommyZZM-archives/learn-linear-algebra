/**
 * Created by tommyZZM.OSX on 16/9/10.
 */
"use strict";

const R = require("ramda");

module.exports = R.curryN(3,(fn,init,a,b) => R.map(groups=>R.reduce(fn,init,groups),R.zip(a,b)))
