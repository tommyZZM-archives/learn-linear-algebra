/**
 * Created by tommyZZM.OSX on 16/9/11.
 */
"use strict";

function Span(vectors) {
    let _basics = Object.freeze(vectors.map(v=>v.clone()));
    Object.defineProperties(this,{
        basics:{
            value:_basics,
            enumerable:false
        }
    })

    return Object.freeze(this)
}

Span.of = function (vectors) {
    return new Span(vectors)
}

Span.check = function (span, vector) {

}

Span.linearTransform = function (span, nextSpan, vectors) {

}
