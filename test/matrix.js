/**
 * Created by tommyZZM.OSX on 16/9/15.
 */
"use strict";
const R = require("ramda");
const expect = require("chai").expect
const Matrix = require("../lib/Matrix");
const Vector = require("../lib/Vector");

describe("Matrix",function () {
    it("Matrix.of((number[])[])",function (done) {

        let m = Matrix.of([
            [1,0,0],
            [0,1,0],
            [0,0,1]
        ]);

        expect(m.rowDimensions).to.be.equal(3);
        expect(m.colDimensions).to.be.equal(3);
        expect(R.equals(m.numbers,[1,0,0,0,1,0,0,0,1])).to.be.equal(true);

        done()
    });

    it("Matrix.from(vector[])", function (done) {

        let v1 = Vector.of([
            1,
            2,
            3
        ])
        let v2 = Vector.of([
            3,
            2,
            1
        ])
        let v3 = Vector.of([
            0,
            0,
            1
        ])

        let m = Matrix.from([v1,v2,v3]);

        expect(m.rowDimensions).to.be.equal(3);
        expect(m.colDimensions).to.be.equal(3);
        expect(R.equals(m.numbers,[1,3,0,2,2,0,3,1,1])).to.be.equal(true);

        done();
    });

    it("Matrix.add", function (done) {
        let m1 = Matrix.of([
            [1,0,0],
            [0,1,0],
            [0,0,1]
        ]);

        let m2 = Matrix.of([
            [2,0,0],
            [0,2,0],
            [0,-2,-1]
        ]);

        let m3 = Matrix.add(m1,m2)

        expect(m3.rowDimensions).to.be.equal(3);
        expect(m3.colDimensions).to.be.equal(3);
        expect(R.equals(m3.numbers,[
            3, 0, 0,
            0, 3, 0,
            0, -2, 0
        ])).to.be.equal(true);

        done()
    });

    it("Matrix.times", function (done) {
        let m1 = Matrix.of([
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ]);

        let m2 = Matrix.times(3,m1);

        expect(m2.rowDimensions).to.be.equal(3);
        expect(m2.colDimensions).to.be.equal(3);
        expect(R.equals(m2.numbers,[
            3, 0, 0,
            0, 3, 0,
            0, 0, 3
        ])).to.be.equal(true);

        done()
    });

})