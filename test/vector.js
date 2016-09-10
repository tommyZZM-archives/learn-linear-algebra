/**
 * Created by tommyZZM.OSX on 16/9/6.
 */
"use strict";
const R = require("ramda");
const expect = require("chai").expect
const Vector = require("../lib/Vector")

describe("Vector",function () {
    it("Vector.of(...)",function (done) {
        let v1 = Vector.of([1,1]);
        expect(/^1\.414/.test(v1.length)).to.be.equal(true);
        done()
    });

    it("Vector.add(...)", function (done) {

        let v1 = Vector.of([0,1]);
        let v2 = Vector.of([-1,-3]);

        let v3 = Vector.add(v1,v2);

        expect(v3.numbers[0]).to.be.equal(0+(-1));
        expect(v3.numbers[1]).to.be.equal(1+(-3));

        let v4 = v1.add(v2);
        expect(R.equals(v3,v4)).to.be.equal(true);

        done()
    })

    it("Vector.add(...) with error", function (done) {

        let v1 = Vector.of([0,1]);
        let v2 = Vector.of([0,1,1]);

        expect(()=>Vector.add(v1,v2)).to.throw(Error);

        done()
    })

    it("Vector.multiply(...)", function (done) {

        let v1 = Vector.of([1,2]);
        let v2 = Vector.multiply(3,v1);

        expect(Vector.equals(v2,Vector.of([3,6]))).to.be.equal(true);

        done()
    })
})