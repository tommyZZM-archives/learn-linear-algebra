/**
 * Created by tommyZZM.OSX on 16/9/15.
 */
"use strict";
const expect = require("chai").expect;
const Rf = require("../packages/ramdaf");

describe("Ramdaf",function () {
    it("Ramdaf.allEqual",function (done) {
        expect(Rf.allEqual([1,1,1])).to.be.equal(true);
        expect(Rf.allEqual([1,2,3])).to.be.equal(false);
        expect(Rf.allEqual([1,1,0])).to.be.equal(false);
        done()
    });
})