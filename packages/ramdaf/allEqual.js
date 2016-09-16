/**
 * Created by tommyZZM.OSX on 16/9/15.
 */
"use strict";

const R = require("ramda")

module.exports = list => {
    return R.all(R.equals(R.head(list)),list)
}
