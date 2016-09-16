/**
 * Created by tommyZZM.OSX on 16/9/12.
 */
"use strict";

const R = require("ramda");
const Rf = require("../packages/ramdaf");
const { zipWithSum } = require("./_interal/util");

function Matrix(rows) {
    if (!Array.isArray(rows) || !rows.length
        || !Rf.allEqual(rows.map(array=>array.length))) {
        throw "Type Error: Matrix construct rows should be vectors with the same dimensions!"
    }

    let _rowDimensions = rows.length;
    let _colDimensions = rows[0].length;
    let _numbers = Object.freeze(R.flatten(rows))

    Object.defineProperties(this,{
        rowDimensions:{
            value:_rowDimensions,
            enumerable:false
        }
        , colDimensions:{
            value:_colDimensions,
            enumerable:false
        }
        , rows: {

        }
        , numbers:{
            value:_numbers,
            enumerable:false
        }
    });

    return Object.freeze(this)
}

Matrix.add = function (a, b) {
    if (!Matrix.isSameSize(a,b))
        throw "Type Error:Matrix add operator must apply on two Matrix with same size!"

    return Matrix.of(R.splitEvery(a.colDimensions,zipWithSum(a.numbers,b.numbers)));
}

Matrix.times = function (times, a) {
    return Matrix.of(R.splitEvery(a.colDimensions,R.map(R.multiply(times),a.numbers)));
}

Matrix.equals = function (a, b) {
}

Matrix.isSameSize = function (a, b) {
    return a.rowDimensions === b.rowDimensions
        && a.colDimensions === b.rowDimensions;
}

Matrix.of = function (rows) {
    return new Matrix(rows)
}

Matrix.from = function (vectors) {
    if (!Array.isArray(vectors) || !vectors.length
        || !Rf.allEqual(vectors.map(v=>v.dimensions))) {
        throw "Type Error: Matrix.from(...) arguments should be vectors with the same dimensions!"
    }

    return Matrix.of(_transformVectorToRows(vectors))
}

function _transformVectorToRows(vectors) {
    return vectors.reduce((rows,v,_,array)=>{
        let head = R.head(rows);
        let numbers = v.numbers;

        if (!head) {
            rows.length = array.length;
        }

        for (let i=0; i<rows.length; i++) {
            if (!rows[i]) rows[i] = [];
            rows[i].push(numbers[i])
        }

        return rows;
    },[])
}


module.exports = Matrix;