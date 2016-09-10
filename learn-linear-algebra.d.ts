/**
 * Created by tommyZZM.OSX on 16/9/10.
 */

declare class Vector {
    constructor(numbers:number[])
    get numbers():number[]
    get dimensions():number
    get length():number
    add(vector:Vector):Vector
    multiply(number:number):Vector
}