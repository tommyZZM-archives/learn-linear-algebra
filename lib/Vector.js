/**
 * Created by tommyZZM.OSX on 16/9/5.
 */
"use strict";
const R = require("ramda");
const Rf = require("../packages/ramdaf")
const qsqrt = require("./_interal/qsqrt");

const zipWithSum = Rf.zipWith((a, b) => a + b);

console.log("zipWithSum",zipWithSum([1,2,3])([1,2,3]))

function Vector(numbers) {

    if (numbers.length<2) throw "TypeError: Vector construct numbers must be more than 1!"

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

Vector.prototype.clone = function () {
    return Vector.of(this.numbers)
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

Vector.isLinerIndependent = function (vectors) {
    // if (vectors.length === 1) return true;
    // if (vectors.length === 0) return true;
    //
    // let head = R.head(vectors);
    //
    // return !R.find((vector)=>{
    //     if (vector === head) return false;
    //     if (vector.dimensions!== head.dimensions) return false;
    //
    //     return R.dropRepeats(
    //             vector.numbers.map((number,index)=>head.numbers[index]/number)
    //         ).length === 1
    // })(vectors)
}

module.exports = Vector;
