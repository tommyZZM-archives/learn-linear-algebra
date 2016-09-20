/**
 * Created by tommyZZM.OSX on 16/9/12.
 */
"use strict";

const R = require("ramda");
const Rf = require("../packages/ramdaf");
const { zipWithSum, maybeZero, equalsZero } = require("./_interal/util");

const vectorsToNumbers = R.map(v=>v.numbers)

function Matrix(rows) {
    if (!Array.isArray(rows) || !rows.length
        || !Rf.allEqual(rows.map(array=>array.length))) {
        throw "Type Error: Matrix constructor require " +
        "rows with has same dimensions!"
    }

    let _rowDimensions = rows.length;
    let _colDimensions = rows[0].length;
    let _numbers = Object.freeze(R.flatten(rows))

    let _getRows = R.memoize(_=>R.splitEvery(_colDimensions,_numbers));
    let _getCols = R.memoize(_=>_transpose(_getRows()));

    Object.defineProperties(this,{
        rows:{
            value:_rowDimensions,
            enumerable:false
        }
        , cols:{
            value:_colDimensions,
            enumerable:false
        }
        , toArray: {
            value:_getRows,
            enumerable:false
        }
        , toArrayColumn: {
            value:_getCols,
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
    if (!Matrix.isSameSize(a, b))
        throw "Type Error: Matrix add operator must apply on two matrices with same size!"

    return Matrix.of(R.splitEvery(a.cols,zipWithSum(a.numbers,b.numbers)));
}

Matrix.times = function (times, a) {
    return Matrix.of(R.splitEvery(a.cols,R.map(R.multiply(times),a.numbers)));
}

Matrix.equals = function (a, b) {
    return Matrix.isSameSize(a,b) && R.equals(a.numbers,b.numbers)
}

Matrix.isSameSize = function (a, b) {
    return a.rows === b.rows
        && a.cols === b.rows;
}

Matrix.multiply = function (a, b) {
    if (!a.cols === b.rows)
        throw "Type Error: Matrix.multiply " +
        "require the columns of the second matrix have to equals " +
        "the rows of the first matrix."

    let _a = a.toArray();
    let _b = b.toArray();

    let a_x_b = _a.reduce((rows, r_a, row$a)=>{

        let zeros = [];
        zeros.length = b.cols;
        zeros.fill(0);

        //use push(...) instead of R.append(...) because origin push(...) should be faster
        rows.push(_b.reduce((row,r_b,col$b)=>{
            let curr_row = r_b.reduce((row_each,number$b, row$b)=>{
                row_each.push(r_a[col$b] * number$b)
                return row_each
            },[]);

            return zipWithSum(curr_row,row);
        },zeros))

        return rows;
    },[]);

    return Matrix.of(a_x_b)
}

//rref: reduced row echelon form
Matrix.rref = function (m) {
    var A = R.clone(m.toArray());
    var rows = m.rows;
    var columns = m.cols;

    var lead = 0;
    for (var k = 0; k < rows; k++) {
        if (columns <= lead) return Matrix.of(A);

        var i = k;
        while (A[i][lead] === 0) {
            i++;
            if (rows === i) {
                i = k;
                lead++;
                if (columns === lead) return Matrix.of(A);
            }
        }
        var irow = A[i], krow = A[k];
        A[i] = krow, A[k] = irow;

        var val = A[k][lead];
        for (var j = 0; j < columns; j++) {
            A[k][j] = maybeZero(A[k][j]/val);
        }

        for (var i = 0; i < rows; i++) {
            if (i === k) continue;
            val = A[i][lead];
            for (var j = 0; j < columns; j++) {
                A[i][j] = maybeZero(A[i][j] - val * A[k][j]);
            }
        }
        lead++;
    }

    return Matrix.of(A);
}

Matrix.rank = function (m) {
    let m$r = Matrix.rref(m);
    let edge = R.min(m$r.rows, m$r.cols)-1;
    let rank = 0;
    let m$r_array = m$r.toArray();
    for ( let i=edge; i>=0; i-- ) {
        for (let j = m$r.cols - 1; j >= i; j--) {
            if (!equalsZero(m$r_array[i][j])) {
                rank = i+1;
                return rank;
            }
        }
    }

    return rank;
}

Matrix.transpose = function (m) {
    return Matrix.of(_transpose(m.toArray()))
}

Matrix.of = function (rows) {
    return new Matrix(rows);
}

Matrix.from = function (vectors) {
    if (!Array.isArray(vectors) || !vectors.length
        || !Rf.allEqual(vectors.map(v=>v.dimensions))) {
        throw "Type Error: Matrix.from(...) argument should be " +
        "array of vectors with the same dimensions!"
    }

    return Matrix.of(_transpose(vectorsToNumbers(vectors)));
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
