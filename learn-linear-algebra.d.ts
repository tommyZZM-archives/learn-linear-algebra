/**
 * Created by tommyZZM.OSX on 16/9/10.
 */

declare class Vector {
    constructor(numbers:number[])
    get numbers():number[]
    get dimensions():number
    get length():number
    add(vector:Vector):Vector
    times(number:number):Vector
}

declare class Matrix {
    constructor(rows:number[][])
    get rowDimensions():number
    get colDimensions():number
}
