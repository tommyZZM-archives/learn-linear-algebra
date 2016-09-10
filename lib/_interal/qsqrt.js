/**
 * Created by tommyZZM.OSX on 16/9/6.
 */
"use strict";

const buf = new ArrayBuffer(Float32Array.BYTES_PER_ELEMENT);
const f32 = new Float32Array(buf);
const u32 = new Uint32Array(buf);

function qsqrt(number) {
    var x2 = 0.5 * (f32[0] = number);
    u32[0] = (0x5f3759df/*0x5f375a86*/ - (u32[0] >> 1));
    var y = f32[0];
    y  = y * ( 1.5 - ( x2 * y * y ) );   // 1st iteration
    return y;
}

module.exports = qsqrt;
