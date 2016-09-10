/**
 * Created by tommyZZM.OSX on 16/9/5.
 */
"use strict";
const R = require("ramda");
const Rf = require("../packages/ramdaf")
const qsqrt = require("./_interal/qsqrt");

const zipWithSum = Rf.zipWith((a, b) => a + b);

function Vector(numbers) {

    let _numbers = Object.freeze(numbers.concat([]));
    let _length = void 0;

    Object.defineProperties(this,{
        numbers:{
            value:_numbers,
            enumerable:false
        }
        , dimensions:{
            value:_numbers.length,
            enumerable:false
        }
        , length:{
            get(){
                if (_length !== void 0) return _length
                _length = 1/qsqrt(_numbers.reduce((final,number)=>final+number*number,0))
                return _length;
            },
            enumerable:false
        }
    })

    return Object.freeze(this)
}

Vector.prototype.add = function (v2) {
    return Vector.add(v2,this);
}

Vector.prototype.multiply = function (times) {
    return Vector.multiply(times,this)
}

Vector.prototype.toString = function () {
    return Vector.serialize(this)
}

Vector.of = function (numbers) {
    return new Vector(numbers)
}

Vector.add = function (a, b) {
    if (a.dimensions!=b.dimensions)
        throw new Error(`Type Error add operator require both vectors dimensions ( ${a.dimensions} ≠ ${b.dimensions} ) to be same!`)

    return Vector.of(zipWithSum(a.numbers,b.numbers))
}

Vector.multiply = function (times, a) {
    let multiply = R.multiply(times);
    return Vector.of(R.map(multiply,a.numbers))
}

Vector.equals = function (a, b) {
    return R.equals(a.numbers,b.numbers)
}

Vector.serialize = function (v) {
    return `Vector{[ ${v.numbers.join(", ")} ]}`
}

module.exports = Vector;
