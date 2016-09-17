/**
 * Created by tommyZZM.OSX on 16/9/12.
 */
"use strict";

const R = require("ramda");
const Rf = require("../packages/ramdaf");
const { zipWithSum } = require("./_interal/util");

const vectorsToNumbers = R.map(v=>v.numbers)

function Matrix(rows) {
    if (!Array.isArray(rows) || !rows.length
        || !Rf.allEqual(rows.map(array=>array.length))) {
        throw "Type Error: Matrix construct rows should be vectors with the same dimensions!"
    }

    let _rowDimensions = rows.length;
    let _colDimensions = rows[0].length;
    let _numbers = Object.freeze(R.flatten(rows))

    let _getRows = R.memoize(_=>R.splitEvery(_colDimensions,_numbers));
    let _getCols = R.memoize(_=>_transpose(_getRows()));

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
            get:()=>_getRows(),
            enumerable:false
        }
        , cols: {
            get:()=>_getCols(),
            enumerable:false
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
    return Matrix.isSameSize(a,b) && R.equals(a.numbers,b.numbers)
}

Matrix.isSameSize = function (a, b) {
    return a.rowDimensions === b.rowDimensions
        && a.colDimensions === b.rowDimensions;
}

Matrix.multiply = function (a, b) {
    if (!a.colDimensions === b.rowDimensions)
        throw "Type Error:Matrix multiply require two matrixs with column equals rows"

    let _a = a.rows;
    let _b = b.rows;

    let a_x_b = _a.reduce((rows, r_a, row$a)=>{

        let zeros = [];
        zeros.length = b.colDimensions;
        zeros.fill(0);

        return R.append(_b.reduce((row,r_b,col$b)=>{
            let curr_row = r_b.reduce((row_each,number$b, row$b)=>{
                return R.append( r_a[col$b] * number$b, row_each)
            },[]);

            return zipWithSum(curr_row,row);
        },zeros),rows);

    },[]);

    return Matrix.of(a_x_b)
}

Matrix.of = function (rows) {
    return new Matrix(rows)
}

Matrix.from = function (vectors) {
    if (!Array.isArray(vectors) || !vectors.length
        || !Rf.allEqual(vectors.map(v=>v.dimensions))) {
        throw "Type Error: Matrix.from(...) arguments should be vectors with the same dimensions!"
    }

    return Matrix.of(_transpose(vectorsToNumbers(vectors)))
}

function _transpose(numbers) {
    return Object.freeze(numbers.reduce((numbers$t,n,_,numbers)=>{

        if (!R.head(numbers$t)) {
            numbers$t.length = n.length;
        }

        for (let i=0; i<numbers$t.length; i++) {
            if (!numbers$t[i]) numbers$t[i] = [];
            numbers$t[i].push(n[i]);
        }

        return Object.freeze(numbers$t);
    },[]))
}

module.exports = Matrix;