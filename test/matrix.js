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
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ]);

        expect(m.rows).to.be.equal(3);
        expect(m.cols).to.be.equal(3);
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

        expect(m.rows).to.be.equal(3);
        expect(m.cols).to.be.equal(3);
        expect(R.equals(m.numbers,[1,3,0,2,2,0,3,1,1])).to.be.equal(true);

        done();
    });

    it("Matrix.add", function (done) {
        let m1 = Matrix.of([
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ]);

        let m2 = Matrix.of([
            [2, 0, 0],
            [0, 2, 0],
            [0, -2, -1]
        ]);

        let m3 = Matrix.add(m1,m2)

        expect(m3.rows).to.be.equal(3);
        expect(m3.cols).to.be.equal(3);
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

        expect(m2.rows).to.be.equal(3);
        expect(m2.cols).to.be.equal(3);
        expect(R.equals(m2.numbers,[
            3, 0, 0,
            0, 3, 0,
            0, 0, 3
        ])).to.be.equal(true);

        done()
    });

    it("Matrix.multiply", function (done) {

        let m1 = Matrix.of([
            [1, 2],
            [3, 4]
        ])

        let m2 = Matrix.of([
            [5, 6, 7],
            [8, 9, 10]
        ])

        /**
         *       [5,            6,             7 ]
         *       [8,            9,             10 ]
         * [1,2] 5*1+8*2 (21),  6*1+9*2 (24),  7*1+10*2 (27)
         * [3,4] 5*3+8*4 (47),  6*3+9*4 (54),  7*3+10*4 (61)
         */
        let m1_x_m2 = Matrix.multiply(m1,m2);

        expect(m1_x_m2.rows).to.be.equal(2);
        expect(m1_x_m2.cols).to.be.equal(3);
        expect(R.equals(m1_x_m2.numbers,[
            21, 24, 27,
            47, 54, 61
        ])).to.be.equal(true);

        done();
    })
    
    it("Matrix.rref", function (done) {

        expect(R.equals(
            Matrix.rref(Matrix.of([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
            ])).toArray(), [
                [1, 0, -1],
                [0, 1, 2],
                [0, 0, 0]
            ]
        )).to.be.equal(true)

        expect(R.equals(
            Matrix.rref(Matrix.of([
                [2, 1, -1, 8],
                [-3, -1, 2, -11],
                [-2, 1, 2, -3]
            ])).toArray(), [
                [1, 0, 0, 2],
                [0, 1, 0, 3],
                [0, 0, 1, -1]
            ]
        )).to.be.equal(true);

        done();
    })

    it("Matrix.rank", function (done) {

        expect(Matrix.rank(Matrix.of([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]))).to.be.equal(2);

        expect(Matrix.rank(Matrix.of([
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ]))).to.be.equal(3);

        done();
    })

})